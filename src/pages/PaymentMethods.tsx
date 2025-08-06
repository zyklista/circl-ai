import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, CreditCard, Plus, MoreVertical } from "lucide-react";
import { useNavigate } from "react-router-dom";

const PaymentMethods = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Payment Methods">
      <div className="min-h-screen p-6 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Payment Methods</h1>
            <p className="text-muted-foreground">Manage your cards and payment options</p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Saved Cards
                  </CardTitle>
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Add Card
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-blue-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">VISA</span>
                      </div>
                      <div>
                        <h4 className="font-medium">•••• •••• •••• 4242</h4>
                        <p className="text-sm text-muted-foreground">Expires 12/25</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Default</span>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-8 bg-red-600 rounded flex items-center justify-center">
                        <span className="text-white text-xs font-bold">MC</span>
                      </div>
                      <div>
                        <h4 className="font-medium">•••• •••• •••• 8888</h4>
                        <p className="text-sm text-muted-foreground">Expires 08/26</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">First Name</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md bg-background" placeholder="Jane" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Last Name</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md bg-background" placeholder="Smith" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Address</label>
                  <input type="text" className="w-full px-3 py-2 border rounded-md bg-background" placeholder="123 Main St" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium">City</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md bg-background" placeholder="San Francisco" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">State</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md bg-background" placeholder="CA" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">ZIP Code</label>
                    <input type="text" className="w-full px-3 py-2 border rounded-md bg-background" placeholder="94111" />
                  </div>
                </div>
                <Button className="w-full">Update Billing Information</Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Payment History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Premium Membership</p>
                      <p className="text-sm text-muted-foreground">Jan 15, 2024</p>
                    </div>
                    <span className="font-medium">$9.99</span>
                  </div>
                  <div className="flex items-center justify-between py-2 border-b">
                    <div>
                      <p className="font-medium">Event Boost</p>
                      <p className="text-sm text-muted-foreground">Jan 10, 2024</p>
                    </div>
                    <span className="font-medium">$4.99</span>
                  </div>
                  <div className="flex items-center justify-between py-2">
                    <div>
                      <p className="font-medium">Premium Membership</p>
                      <p className="text-sm text-muted-foreground">Dec 15, 2023</p>
                    </div>
                    <span className="font-medium">$9.99</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentMethods;