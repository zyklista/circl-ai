import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Crown, Users, Star, CheckCircle, X } from "lucide-react";

const Membership = () => {
  return (
    <Layout title="Membership">
      <div className="min-h-screen p-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Membership</h1>

          {/* Current Plan */}
          <Card className="shadow-soft border-primary/20">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Current Plan: Free
                </CardTitle>
                <Badge variant="outline">Active</Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span>Groups Joined</span>
                  <span>2 / 2</span>
                </div>
                <Progress value={100} className="h-2" />
                <p className="text-sm text-muted-foreground mt-1">
                  You've reached your limit. Upgrade to join more groups!
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Up to 2 groups</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Basic messaging</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-red-500" />
                  <span>Priority support</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <X className="w-4 h-4 text-red-500" />
                  <span>Advanced features</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Upgrade Options */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-primary" />
                  Premium Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-primary">$9.99</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Join up to 10 groups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Advanced messaging</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Priority event access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Profile customization</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-primary text-white">
                  Upgrade to Premium
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-amber-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-amber-500" />
                  VIP Plan
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-amber-500">$19.99</div>
                  <div className="text-muted-foreground">per month</div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Unlimited groups</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Premium messaging features</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>Create unlimited events</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>VIP badge & exclusive access</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span>24/7 priority support</span>
                  </div>
                </div>
                
                <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white">
                  Upgrade to VIP
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Verification Process */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Account Verification</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                Complete verification to unlock additional features and build trust with other community members.
              </p>
              
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg bg-green-50">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-medium text-green-800">Email</h3>
                  <p className="text-sm text-green-600">Verified</p>
                </div>
                <div className="text-center p-4 border rounded-lg bg-yellow-50">
                  <div className="w-8 h-8 bg-yellow-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-yellow-800 text-sm font-bold">📱</span>
                  </div>
                  <h3 className="font-medium text-yellow-800">Phone</h3>
                  <p className="text-sm text-yellow-600">Pending</p>
                  <Button size="sm" className="mt-2" variant="outline">
                    Verify Phone
                  </Button>
                </div>
                <div className="text-center p-4 border rounded-lg bg-gray-50">
                  <div className="w-8 h-8 bg-gray-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-gray-600 text-sm font-bold">🆔</span>
                  </div>
                  <h3 className="font-medium text-gray-800">Identity</h3>
                  <p className="text-sm text-gray-600">Not Started</p>
                  <Button size="sm" className="mt-2" variant="outline">
                    Start Verification
                  </Button>
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