-- Fix Critical Security Issues

-- 1. Replace security definer views with proper access controls
DROP VIEW IF EXISTS dashboard_stats;
DROP VIEW IF EXISTS recent_activity;

-- Create secure dashboard stats function instead of view
CREATE OR REPLACE FUNCTION get_dashboard_stats()
RETURNS TABLE (
  new_users_30d bigint,
  new_posts_30d bigint,
  active_boosts bigint,
  pending_reports bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to access dashboard stats
  IF get_current_user_role() != 'admin' THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    (SELECT COUNT(*) FROM auth.users WHERE created_at >= NOW() - INTERVAL '30 days')::bigint as new_users_30d,
    (SELECT COUNT(*) FROM posts WHERE created_at >= NOW() - INTERVAL '30 days')::bigint as new_posts_30d,
    (SELECT COUNT(*) FROM business_boosts WHERE status = 'active' AND expires_at > NOW())::bigint as active_boosts,
    (SELECT COUNT(*) FROM reports WHERE status = 'pending')::bigint as pending_reports;
END;
$$;

-- Create secure recent activity function
CREATE OR REPLACE FUNCTION get_recent_activity()
RETURNS TABLE (
  id uuid,
  activity_type text,
  title text,
  user_name text,
  created_at timestamp with time zone
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Only allow admins to access recent activity
  IF get_current_user_role() != 'admin' THEN
    RAISE EXCEPTION 'Access denied. Admin role required.';
  END IF;

  RETURN QUERY
  SELECT 
    p.id,
    'post_created'::text as activity_type,
    p.title,
    pr.display_name as user_name,
    p.created_at
  FROM posts p
  LEFT JOIN profiles pr ON p.user_id = pr.user_id
  WHERE p.created_at >= NOW() - INTERVAL '7 days'
  ORDER BY p.created_at DESC
  LIMIT 10;
END;
$$;

-- 2. Add missing WITH CHECK clauses to UPDATE policies
DROP POLICY IF EXISTS "Users can update own posts" ON posts;
CREATE POLICY "Users can update own posts" 
ON posts 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own profile" ON profiles;
CREATE POLICY "Users can update their own profile" 
ON profiles 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own business listings" ON business_listings;
CREATE POLICY "Users can update their own business listings" 
ON business_listings 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own help posts" ON help_posts;
CREATE POLICY "Users can update their own help posts" 
ON help_posts 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own marketplace posts" ON marketplace_posts;
CREATE POLICY "Users can update their own marketplace posts" 
ON marketplace_posts 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own business boosts" ON business_boosts;
CREATE POLICY "Users can update their own business boosts" 
ON business_boosts 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own post media" ON post_media;
CREATE POLICY "Users can update their own post media" 
ON post_media 
FOR UPDATE 
USING (EXISTS (SELECT 1 FROM posts p WHERE p.id = post_media.post_id AND p.user_id = auth.uid()))
WITH CHECK (EXISTS (SELECT 1 FROM posts p WHERE p.id = post_media.post_id AND p.user_id = auth.uid()));

DROP POLICY IF EXISTS "Users can update their own messages" ON messages;
CREATE POLICY "Users can update their own messages" 
ON messages 
FOR UPDATE 
USING (auth.uid() = sender_id)
WITH CHECK (auth.uid() = sender_id);

DROP POLICY IF EXISTS "Users can update own profile" ON users;
CREATE POLICY "Users can update own profile" 
ON users 
FOR UPDATE 
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- 3. Secure spatial reference system table
ALTER TABLE spatial_ref_sys ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Spatial reference system read-only" 
ON spatial_ref_sys 
FOR SELECT 
USING (true);

-- Block all modifications to spatial_ref_sys
CREATE POLICY "Block spatial_ref_sys modifications" 
ON spatial_ref_sys 
FOR ALL 
USING (false)
WITH CHECK (false);

-- 4. Add validation triggers for time-based constraints
CREATE OR REPLACE FUNCTION validate_business_boost_times()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.expires_at IS NOT NULL AND NEW.expires_at <= NEW.starts_at THEN
    RAISE EXCEPTION 'expires_at must be after starts_at';
  END IF;
  
  IF NEW.starts_at > NOW() + INTERVAL '1 year' THEN
    RAISE EXCEPTION 'starts_at cannot be more than 1 year in the future';
  END IF;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER validate_business_boost_times_trigger
  BEFORE INSERT OR UPDATE ON business_boosts
  FOR EACH ROW
  EXECUTE FUNCTION validate_business_boost_times();

-- 5. Add audit logging trigger for sensitive operations
CREATE OR REPLACE FUNCTION audit_sensitive_operations()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'DELETE' THEN
    INSERT INTO audit_logs (table_name, action, record_id, user_id, old_values)
    VALUES (TG_TABLE_NAME, TG_OP, OLD.id, auth.uid(), to_jsonb(OLD));
    RETURN OLD;
  ELSIF TG_OP = 'UPDATE' THEN
    INSERT INTO audit_logs (table_name, action, record_id, user_id, old_values, new_values)
    VALUES (TG_TABLE_NAME, TG_OP, NEW.id, auth.uid(), to_jsonb(OLD), to_jsonb(NEW));
    RETURN NEW;
  ELSIF TG_OP = 'INSERT' THEN
    INSERT INTO audit_logs (table_name, action, record_id, user_id, new_values)
    VALUES (TG_TABLE_NAME, TG_OP, NEW.id, auth.uid(), to_jsonb(NEW));
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

-- Add audit triggers to sensitive tables
CREATE TRIGGER audit_user_roles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON user_roles
  FOR EACH ROW
  EXECUTE FUNCTION audit_sensitive_operations();

CREATE TRIGGER audit_business_boosts_trigger
  AFTER INSERT OR UPDATE OR DELETE ON business_boosts
  FOR EACH ROW
  EXECUTE FUNCTION audit_sensitive_operations();