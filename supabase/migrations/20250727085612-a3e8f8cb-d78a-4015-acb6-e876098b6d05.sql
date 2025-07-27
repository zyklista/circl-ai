-- Enable RLS on tables that are missing it (excluding views)
ALTER TABLE public.business_boosts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversation_participants ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for business_boosts
CREATE POLICY "Users can view their own business boosts" ON public.business_boosts
FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own business boosts" ON public.business_boosts
FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own business boosts" ON public.business_boosts
FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for categories (public read)
CREATE POLICY "Categories are viewable by everyone" ON public.categories
FOR SELECT USING (true);

-- Create RLS policies for conversations
CREATE POLICY "Users can view conversations they participate in" ON public.conversations
FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM conversation_participants cp 
    WHERE cp.conversation_id = conversations.id 
    AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can create conversations" ON public.conversations
FOR INSERT WITH CHECK (true);

-- Create RLS policies for conversation_participants
CREATE POLICY "Users can view participants in their conversations" ON public.conversation_participants
FOR SELECT USING (
  user_id = auth.uid() OR 
  EXISTS (
    SELECT 1 FROM conversation_participants cp 
    WHERE cp.conversation_id = conversation_participants.conversation_id 
    AND cp.user_id = auth.uid()
  )
);

CREATE POLICY "Users can join conversations" ON public.conversation_participants
FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for reports
CREATE POLICY "Users can view their own reports" ON public.reports
FOR SELECT USING (auth.uid() = reporter_id);

CREATE POLICY "Users can create reports" ON public.reports
FOR INSERT WITH CHECK (auth.uid() = reporter_id);

-- Create RLS policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
FOR SELECT USING (auth.uid() = user_id);

-- Create security definer function to check user roles
CREATE OR REPLACE FUNCTION public.get_user_role(user_uuid uuid DEFAULT auth.uid())
RETURNS text
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
  SELECT role FROM public.user_roles WHERE user_id = user_uuid LIMIT 1;
$$;