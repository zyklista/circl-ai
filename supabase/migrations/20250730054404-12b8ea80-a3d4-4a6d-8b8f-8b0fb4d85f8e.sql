-- Create membership tiers enum
CREATE TYPE public.membership_tier AS ENUM ('free', 'elite', 'premium');

-- Create subscriptions table to track user memberships
CREATE TABLE public.subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  tier membership_tier NOT NULL DEFAULT 'free',
  stripe_subscription_id TEXT,
  stripe_customer_id TEXT,
  status TEXT NOT NULL DEFAULT 'active',
  current_period_start TIMESTAMPTZ,
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Create policies for subscriptions
CREATE POLICY "Users can view their own subscription" 
ON public.subscriptions 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own subscription" 
ON public.subscriptions 
FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscription" 
ON public.subscriptions 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create groups table
CREATE TABLE public.groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  is_private BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for groups
ALTER TABLE public.groups ENABLE ROW LEVEL SECURITY;

-- Create policies for groups
CREATE POLICY "Groups are viewable by everyone" 
ON public.groups 
FOR SELECT 
USING (NOT is_private OR creator_id = auth.uid());

CREATE POLICY "Users can create groups if allowed" 
ON public.groups 
FOR INSERT 
WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own groups" 
ON public.groups 
FOR UPDATE 
USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own groups" 
ON public.groups 
FOR DELETE 
USING (auth.uid() = creator_id);

-- Create events table
CREATE TABLE public.events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  creator_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  group_id UUID REFERENCES public.groups(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  location TEXT,
  start_time TIMESTAMPTZ NOT NULL,
  end_time TIMESTAMPTZ,
  is_paid BOOLEAN DEFAULT false,
  price DECIMAL,
  max_participants INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for events
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;

-- Create policies for events
CREATE POLICY "Events are viewable by everyone" 
ON public.events 
FOR SELECT 
USING (true);

CREATE POLICY "Users can create events" 
ON public.events 
FOR INSERT 
WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Users can update their own events" 
ON public.events 
FOR UPDATE 
USING (auth.uid() = creator_id);

CREATE POLICY "Users can delete their own events" 
ON public.events 
FOR DELETE 
USING (auth.uid() = creator_id);

-- Create ads table
CREATE TABLE public.ads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT,
  target_url TEXT,
  weekly_budget DECIMAL NOT NULL DEFAULT 4.9,
  bid_amount DECIMAL NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  starts_at TIMESTAMPTZ NOT NULL,
  ends_at TIMESTAMPTZ NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for ads
ALTER TABLE public.ads ENABLE ROW LEVEL SECURITY;

-- Create policies for ads
CREATE POLICY "Users can view active ads" 
ON public.ads 
FOR SELECT 
USING (status = 'active');

CREATE POLICY "Users can manage their own ads" 
ON public.ads 
FOR ALL 
USING (auth.uid() = user_id);

-- Create ad payments table
CREATE TABLE public.ad_payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  ad_id UUID NOT NULL REFERENCES public.ads(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  stripe_payment_intent_id TEXT,
  amount DECIMAL NOT NULL,
  discount_percent INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for ad payments
ALTER TABLE public.ad_payments ENABLE ROW LEVEL SECURITY;

-- Create policies for ad payments
CREATE POLICY "Users can view their own ad payments" 
ON public.ad_payments 
FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own ad payments" 
ON public.ad_payments 
FOR INSERT 
WITH CHECK (auth.uid() = user_id);

-- Create subscription plans reference table
CREATE TABLE public.subscription_plans (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tier membership_tier NOT NULL UNIQUE,
  name TEXT NOT NULL,
  price_monthly DECIMAL NOT NULL,
  stripe_price_id TEXT,
  features JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS for subscription plans
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;

-- Create policy for subscription plans
CREATE POLICY "Subscription plans are viewable by everyone" 
ON public.subscription_plans 
FOR SELECT 
USING (true);

-- Insert default plans
INSERT INTO public.subscription_plans (tier, name, price_monthly, features) VALUES
('free', 'Free', 0, '{"groups_limit": 5, "can_join_events": true, "can_buy_marketplace": true}'),
('elite', 'Elite', 9.9, '{"groups_limit": 10, "can_create_paid_events": true, "can_create_ads": true}'),
('premium', 'Premium', 14.9, '{"groups_limit": null, "can_sell_marketplace": true, "can_create_paid_events": true, "can_create_ads": true, "ad_discount": 20}');