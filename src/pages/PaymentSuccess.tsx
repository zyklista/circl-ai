import { useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  Download, 
  ArrowRight, 
  Package, 
  MessageSquare,
  Home,
  Calendar
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    toast({
      title: "Payment Successful!",
      description: "Your payment has been processed successfully."
    });
  }, [toast]);

  // Mock transaction data
  const transaction = {
    id: "TXN123456789",
    item: "Vintage Camera",
    seller: "Jane Smith",
    amount: 280.80,
    date: new Date().toLocaleDateString(),
    estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString(),
    trackingAvailable: new Date(Date.now() + 24 * 60 * 60 * 1000).toLocaleDateString()
  };

  return (
    <Layout title="Payment Successful">
      <div className="min-h-screen p-6" style={{ background: 'var(--community-bg)' }}>
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="mx-auto w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
            <p className="text-muted-foreground">
              Thank you for your purchase. Your order has been confirmed and is being processed.
            </p>
          </div>

          {/* Transaction Details */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Order Confirmation</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Transaction ID</span>
                <Badge variant="secondary">{transaction.id}</Badge>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Item</span>
                <span className="font-medium">{transaction.item}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Seller</span>
                <span className="font-medium">{transaction.seller}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Amount Paid</span>
                <span className="font-bold text-lg">${transaction.amount}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Date</span>
                <span className="font-medium">{transaction.date}</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Delivery Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Estimated Delivery</span>
                <span className="font-medium">{transaction.estimatedDelivery}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tracking Available</span>
                <span className="font-medium">{transaction.trackingAvailable}</span>
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-800">
                  <strong>Next Steps:</strong> You'll receive a confirmation email shortly with your receipt and tracking information once your item ships.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Button 
              variant="outline" 
              onClick={() => navigate(`/transactions/${transaction.id}`)}
              className="h-12"
            >
              <Package className="w-4 h-4 mr-2" />
              View Order Details
            </Button>
            
            <Button 
              variant="outline"
              className="h-12"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => navigate("/seller-inbox")}
              className="h-12"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              Message Seller
            </Button>
            
            <Button 
              onClick={() => navigate("/marketplace")}
              className="h-12 bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </div>

          {/* Return Home */}
          <div className="text-center">
            <Button 
              variant="outline" 
              onClick={() => navigate("/")}
              className="w-full sm:w-auto"
            >
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;