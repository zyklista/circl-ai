-- Phase 1: Critical Database Security Fixes

-- 1. Add missing DELETE policies for critical tables
CREATE POLICY "Users can delete their own posts" 
ON public.posts 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own profiles" 
ON public.profiles 
FOR DELETE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own post media" 
ON public.post_media 
FOR DELETE 
USING (EXISTS (
  SELECT 1 FROM posts p 
  WHERE p.id = post_media.post_id 
  AND p.user_id = auth.uid()
));

CREATE POLICY "Users can delete their own messages" 
ON public.messages 
FOR DELETE 
USING (auth.uid() = sender_id);

-- 2. Add missing UPDATE policies
CREATE POLICY "Users can update their own messages" 
ON public.messages 
FOR UPDATE 
USING (auth.uid() = sender_id);

CREATE POLICY "Users can update their own post media" 
ON public.post_media 
FOR UPDATE 
USING (EXISTS (
  SELECT 1 FROM posts p 
  WHERE p.id = post_media.post_id 
  AND p.user_id = auth.uid()
));

-- 3. Create secure role checking function to avoid RLS recursion
CREATE OR REPLACE FUNCTION public.get_current_user_role()
RETURNS TEXT 
LANGUAGE sql 
SECURITY DEFINER 
STABLE
SET search_path = public
AS $$
  SELECT role::text 
  FROM public.user_roles 
  WHERE user_id = auth.uid() 
  LIMIT 1
$$;

-- 4. Add proper RLS policies for user_roles table
CREATE POLICY "Admins can manage all user roles" 
ON public.user_roles 
FOR ALL 
USING (public.get_current_user_role() = 'admin');

CREATE POLICY "Users can insert admin role only if no admins exist" 
ON public.user_roles 
FOR INSERT 
WITH CHECK (
  role = 'admin' AND NOT EXISTS (
    SELECT 1 FROM public.user_roles WHERE role = 'admin'
  )
);

-- 5. Create function to validate role assignments
CREATE OR REPLACE FUNCTION public.validate_role_assignment()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- Prevent users from assigning themselves admin roles (except first admin)
  IF NEW.role = 'admin' AND NEW.user_id = auth.uid() THEN
    IF EXISTS (SELECT 1 FROM public.user_roles WHERE role = 'admin') THEN
      RAISE EXCEPTION 'Cannot self-assign admin role when admins already exist';
    END IF;
  END IF;
  
  -- Validate that only admins can assign roles to others
  IF NEW.user_id != auth.uid() AND public.get_current_user_role() != 'admin' THEN
    RAISE EXCEPTION 'Only admins can assign roles to other users';
  END IF;
  
  RETURN NEW;
END;
$$;

-- 6. Create trigger for role validation
CREATE TRIGGER validate_role_assignment_trigger
  BEFORE INSERT OR UPDATE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.validate_role_assignment();

-- 7. Secure existing functions with proper search path
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER 
SET search_path = public, auth
AS $$
BEGIN
  INSERT INTO public.profiles (user_id, display_name)
  VALUES (NEW.id, NEW.raw_user_meta_data ->> 'display_name');
  RETURN NEW;
END;
$$;

-- 8. Add audit logging for sensitive operations
CREATE TABLE public.audit_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  action text NOT NULL,
  table_name text NOT NULL,
  record_id uuid,
  old_values jsonb,
  new_values jsonb,
  created_at timestamp with time zone DEFAULT now()
);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can view all audit logs" 
ON public.audit_logs 
FOR SELECT 
USING (public.get_current_user_role() = 'admin');

-- 9. Create audit trigger function
CREATE OR REPLACE FUNCTION public.audit_trigger()
RETURNS TRIGGER 
LANGUAGE plpgsql 
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.audit_logs (
    user_id, 
    action, 
    table_name, 
    record_id, 
    old_values, 
    new_values
  ) VALUES (
    auth.uid(),
    TG_OP,
    TG_TABLE_NAME,
    COALESCE(NEW.id, OLD.id),
    CASE WHEN TG_OP = 'DELETE' THEN to_jsonb(OLD) ELSE NULL END,
    CASE WHEN TG_OP = 'INSERT' OR TG_OP = 'UPDATE' THEN to_jsonb(NEW) ELSE NULL END
  );
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

-- 10. Add audit triggers to sensitive tables
CREATE TRIGGER audit_user_roles_trigger
  AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();

CREATE TRIGGER audit_posts_trigger
  AFTER DELETE ON public.posts
  FOR EACH ROW EXECUTE FUNCTION public.audit_trigger();