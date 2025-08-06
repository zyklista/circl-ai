import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Crown, Star, Zap, Check, Shield, User } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Membership = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: "basic",
      name: "BASIC",
      price: "Free",
      icon: User,
      color: "bg-gray-100 text-gray-700",
      features: [
        "Create up to 3 posts per month",
        "Join up to 5 groups",
        "Basic messaging",
        "Community support"
      ],
      current: true
    },
    {
      id: "elite",
      name: "ELITE",
      price: "$9.99/month",
      icon: Star,
      color: "bg-blue-100 text-blue-700",
      features: [
        "Create up to 15 posts per month",
        "Join unlimited groups",
        "Priority messaging",
        "Create events",
        "Basic analytics",
        "Email support"
      ],
      popular: true
    },
    {
      id: "premium",
      name: "PREMIUM",
      price: "$19.99/month",
      icon: Crown,
      color: "bg-purple-100 text-purple-700",
      features: [
        "Unlimited posts",
        "Create unlimited groups",
        "Advanced messaging",
        "Unlimited events",
        "Advanced analytics",
        "Business listings",
        "Priority support",
        "Post boosting"
      ]
    }
  ];

  return (
    <Layout title="Membership">
      <div className="min-h-screen p-6 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-6xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Membership Plans</h1>
            <p className="text-muted-foreground">Choose the plan that best fits your needs</p>
          </div>

          {/* Current Plan */}
          <Card className="shadow-soft mb-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Current Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center">
                    <User className="w-6 h-6 text-gray-700" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">BASIC Plan</h3>
                    <p className="text-sm text-muted-foreground">Free forever</p>
                  </div>
                </div>
                <Badge variant="secondary">Active</Badge>
              </div>
              <div className="mt-4 p-4 bg-secondary/20 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Groups joined</span>
                  <span className="text-sm font-medium">2 / 5</span>
                </div>
                <div className="w-full bg-secondary/30 rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '40%' }}></div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Plan Options */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {plans.map((plan) => (
              <Card 
                key={plan.id} 
                className={`shadow-soft transition-all duration-200 ${
                  plan.popular ? 'ring-2 ring-primary border-primary' : ''
                } ${plan.current ? 'opacity-75' : 'hover:shadow-medium'}`}
              >
                <CardHeader className="text-center">
                  {plan.popular && (
                    <Badge className="mb-2 mx-auto w-fit">Most Popular</Badge>
                  )}
                  <div className={`w-16 h-16 mx-auto rounded-xl flex items-center justify-center ${plan.color}`}>
                    <plan.icon className="w-8 h-8" />
                  </div>
                  <CardTitle className="mt-4">{plan.name}</CardTitle>
                  <div className="text-2xl font-bold text-primary mt-2">{plan.price}</div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <Button 
                    className="w-full" 
                    variant={plan.current ? "outline" : plan.popular ? "default" : "outline"}
                    disabled={plan.current}
                  >
                    {plan.current ? "Current Plan" : "Upgrade"}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Account Verification */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5" />
                Account Verification
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Email Verification</h4>
                    <Badge variant="default">Verified</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Your email has been verified</p>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Phone Verification</h4>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Verify your phone number</p>
                  <Button size="sm" variant="outline">Verify Now</Button>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">Identity Verification</h4>
                    <Badge variant="outline">Not Started</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">Complete identity verification</p>
                  <Button size="sm" variant="outline">Start Process</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Membership;