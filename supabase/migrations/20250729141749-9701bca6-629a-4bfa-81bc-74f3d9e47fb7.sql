-- Fix remaining security issues and implement location-based filtering

-- 1. Enable RLS on spatial_ref_sys (this is a system table, but we'll try)
-- Note: This might not work as it's a PostGIS system table
-- ALTER TABLE public.spatial_ref_sys ENABLE ROW LEVEL SECURITY;

-- 2. Add country field to users and posts for location-based filtering
ALTER TABLE public.users 
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS timezone TEXT DEFAULT 'UTC';

ALTER TABLE public.posts 
ADD COLUMN IF NOT EXISTS country TEXT,
ADD COLUMN IF NOT EXISTS proximity_score NUMERIC DEFAULT 0;

-- 3. Create function to get user's country
CREATE OR REPLACE FUNCTION public.get_user_country(_user_id UUID)
RETURNS TEXT AS $$
  SELECT country FROM public.users WHERE id = _user_id;
$$ LANGUAGE SQL STABLE SECURITY DEFINER;

-- 4. Create function to calculate distance between two points
CREATE OR REPLACE FUNCTION public.calculate_distance(
  lat1 NUMERIC, lng1 NUMERIC, 
  lat2 NUMERIC, lng2 NUMERIC
) RETURNS NUMERIC AS $$
BEGIN
  -- Haversine formula for calculating distance
  RETURN (
    6371 * acos(
      cos(radians(lat1)) * cos(radians(lat2)) * 
      cos(radians(lng2) - radians(lng1)) + 
      sin(radians(lat1)) * sin(radians(lat2))
    )
  );
END;
$$ LANGUAGE plpgsql IMMUTABLE SECURITY DEFINER;

-- 5. Update RLS policies for location-based filtering

-- Posts: Only show posts from same country or within 100km if no country set
DROP POLICY IF EXISTS "Posts are public" ON public.posts;
CREATE POLICY "Location-aware posts visibility" ON public.posts
FOR SELECT USING (
  is_active = true AND (
    -- Same country
    country = get_user_country(auth.uid()) OR
    -- Within 100km if both have coordinates
    (
      location_lat IS NOT NULL AND location_lng IS NOT NULL AND
      EXISTS (
        SELECT 1 FROM public.users u 
        WHERE u.id = auth.uid() 
        AND u.location_lat IS NOT NULL 
        AND u.location_lng IS NOT NULL
        AND calculate_distance(
          location_lat, location_lng,
          u.location_lat, u.location_lng
        ) <= 100
      )
    ) OR
    -- If no location data, show all for now (can be restricted later)
    (country IS NULL AND get_user_country(auth.uid()) IS NULL)
  )
);

-- Marketplace posts: Same location filtering
DROP POLICY IF EXISTS "Marketplace posts are viewable by everyone" ON public.marketplace_posts;
CREATE POLICY "Location-aware marketplace posts" ON public.marketplace_posts
FOR SELECT USING (
  is_active = true AND (
    -- Post location matches user location or within reasonable distance
    location = (SELECT location FROM public.users WHERE id = auth.uid()) OR
    location IS NULL OR
    -- For business posts, show if in same general area
    EXISTS (
      SELECT 1 FROM public.users u 
      WHERE u.id = auth.uid() 
      AND (u.location = marketplace_posts.location OR u.location IS NULL)
    )
  )
);

-- Help posts: Same location filtering
DROP POLICY IF EXISTS "Help posts are viewable by everyone" ON public.help_posts;
CREATE POLICY "Location-aware help posts" ON public.help_posts
FOR SELECT USING (
  is_active = true AND (
    location = (SELECT location FROM public.users WHERE id = auth.uid()) OR
    location IS NULL OR
    EXISTS (
      SELECT 1 FROM public.users u 
      WHERE u.id = auth.uid() 
      AND (u.location = help_posts.location OR u.location IS NULL)
    )
  )
);

-- Business listings: Show local businesses only
DROP POLICY IF EXISTS "Business listings are viewable by everyone" ON public.business_listings;
CREATE POLICY "Location-aware business listings" ON public.business_listings
FOR SELECT USING (
  is_active = true AND (
    location = (SELECT location FROM public.users WHERE id = auth.uid()) OR
    location IS NULL OR
    EXISTS (
      SELECT 1 FROM public.users u 
      WHERE u.id = auth.uid() 
      AND (u.location = business_listings.location OR u.location IS NULL)
    )
  )
);

-- 6. Create function to update proximity scores
CREATE OR REPLACE FUNCTION public.update_proximity_scores()
RETURNS VOID AS $$
BEGIN
  UPDATE public.posts 
  SET proximity_score = CASE 
    WHEN location_lat IS NOT NULL AND location_lng IS NOT NULL THEN
      COALESCE((
        SELECT calculate_distance(
          posts.location_lat, posts.location_lng,
          u.location_lat, u.location_lng
        )
        FROM public.users u 
        WHERE u.id = auth.uid()
        AND u.location_lat IS NOT NULL 
        AND u.location_lng IS NOT NULL
      ), 999999)
    ELSE 999999
  END
  WHERE id = id; -- Update all posts
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 7. Add storage bucket for UploadThing file metadata
CREATE TABLE IF NOT EXISTS public.uploaded_files (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
  file_name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  file_type TEXT,
  uploadthing_key TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS on uploaded_files
ALTER TABLE public.uploaded_files ENABLE ROW LEVEL SECURITY;

-- RLS policies for uploaded_files
CREATE POLICY "Users can view their own files" ON public.uploaded_files
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can upload their own files" ON public.uploaded_files
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own files" ON public.uploaded_files
FOR DELETE USING (auth.uid() = user_id);

-- 8. Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_posts_country ON public.posts(country);
CREATE INDEX IF NOT EXISTS idx_posts_location ON public.posts(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_posts_proximity ON public.posts(proximity_score);
CREATE INDEX IF NOT EXISTS idx_users_country ON public.users(country);
CREATE INDEX IF NOT EXISTS idx_users_location ON public.users(location_lat, location_lng);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_user ON public.uploaded_files(user_id);
CREATE INDEX IF NOT EXISTS idx_uploaded_files_post ON public.uploaded_files(post_id);

-- 9. Create trigger to update proximity scores when user location changes
CREATE OR REPLACE FUNCTION public.trigger_update_proximity()
RETURNS TRIGGER AS $$
BEGIN
  -- Update proximity scores for all posts when user location changes
  IF (OLD.location_lat IS DISTINCT FROM NEW.location_lat OR 
      OLD.location_lng IS DISTINCT FROM NEW.location_lng OR
      OLD.country IS DISTINCT FROM NEW.country) THEN
    PERFORM public.update_proximity_scores();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS user_location_update_proximity ON public.users;
CREATE TRIGGER user_location_update_proximity
  AFTER UPDATE ON public.users
  FOR EACH ROW
  EXECUTE FUNCTION public.trigger_update_proximity();