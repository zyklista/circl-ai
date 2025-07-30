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

-- Function to get user membership tier
CREATE OR REPLACE FUNCTION public.get_user_membership_tier(user_uuid UUID)
RETURNS membership_tier
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT COALESCE(
    (SELECT tier FROM public.subscriptions WHERE user_id = user_uuid AND status = 'active'),
    'free'::membership_tier
  );
$$;

-- Function to check if user can create groups
CREATE OR REPLACE FUNCTION public.can_create_group(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    CASE 
      WHEN get_user_membership_tier(user_uuid) = 'free' THEN 
        (SELECT COUNT(*) FROM groups WHERE creator_id = user_uuid) < 5
      WHEN get_user_membership_tier(user_uuid) = 'elite' THEN 
        (SELECT COUNT(*) FROM groups WHERE creator_id = user_uuid) < 10
      WHEN get_user_membership_tier(user_uuid) = 'premium' THEN 
        TRUE
      ELSE FALSE
    END;
$$;

-- Function to check if user can sell in marketplace
CREATE OR REPLACE FUNCTION public.can_sell_in_marketplace(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT get_user_membership_tier(user_uuid) = 'premium';
$$;

-- Function to check if user can create paid events
CREATE OR REPLACE FUNCTION public.can_create_paid_events(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT get_user_membership_tier(user_uuid) IN ('elite', 'premium');
$$;

-- Function to check if user can create ads
CREATE OR REPLACE FUNCTION public.can_create_ads(user_uuid UUID)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT get_user_membership_tier(user_uuid) IN ('elite', 'premium');
$$;

-- Function to get ad discount percentage
CREATE OR REPLACE FUNCTION public.get_ad_discount_percent(user_uuid UUID)
RETURNS INTEGER
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT 
    CASE 
      WHEN get_user_membership_tier(user_uuid) = 'premium' THEN 20
      ELSE 0
    END;
$$;

-- Add membership tier check to groups creation
ALTER TABLE public.groups ADD CONSTRAINT check_can_create_group 
CHECK (can_create_group(creator_id));

-- Update existing marketplace posts policy to check membership
DROP POLICY IF EXISTS "Users can create their own marketplace posts" ON public.marketplace_posts;
CREATE POLICY "Users can create marketplace posts if premium" 
ON public.marketplace_posts 
FOR INSERT 
WITH CHECK (auth.uid() = user_id AND can_sell_in_marketplace(auth.uid()));

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

-- Insert default plans
INSERT INTO public.subscription_plans (tier, name, price_monthly, features) VALUES
('free', 'Free', 0, '{"groups_limit": 5, "can_join_events": true, "can_buy_marketplace": true}'),
('elite', 'Elite', 9.9, '{"groups_limit": 10, "can_create_paid_events": true, "can_create_ads": true}'),
('premium', 'Premium', 14.9, '{"groups_limit": null, "can_sell_marketplace": true, "can_create_paid_events": true, "can_create_ads": true, "ad_discount": 20}');

-- Make subscription plans viewable by everyone
ALTER TABLE public.subscription_plans ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Subscription plans are viewable by everyone" 
ON public.subscription_plans 
FOR SELECT 
USING (true);