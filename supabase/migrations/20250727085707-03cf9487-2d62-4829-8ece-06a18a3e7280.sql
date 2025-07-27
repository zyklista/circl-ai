-- Enable RLS on post_media only (system tables can't be modified)
ALTER TABLE public.post_media ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for post_media
CREATE POLICY "Post media is viewable by everyone" ON public.post_media
FOR SELECT USING (true);

CREATE POLICY "Users can insert media for their posts" ON public.post_media
FOR INSERT WITH CHECK (
  EXISTS (
    SELECT 1 FROM posts p 
    WHERE p.id = post_media.post_id 
    AND p.user_id = auth.uid()
  )
);

-- Fix function search paths for security
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid DEFAULT auth.uid())
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT role FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$;