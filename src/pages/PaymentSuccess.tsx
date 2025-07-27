import { useLocation, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Download, ArrowLeft, Package } from "lucide-react";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { item, quantity, total } = location.state || {};

  if (!item) {
    return (
      <Layout title="Payment Success">
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h1 className="text-2xl font-bold text-foreground mb-4">Payment Successful!</h1>
            <Button onClick={() => navigate('/marketplace')}>
              Continue Shopping
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const orderNumber = `ORD-${Date.now()}`;

  return (
    <Layout title="Payment Success">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--marketplace-bg)' }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-12 h-12 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Payment Successful!</h1>
              <p className="text-foreground/80 mt-2">
                Thank you for your purchase. Your order has been confirmed.
              </p>
            </div>
          </div>

          {/* Order Details */}
          <Card className="shadow-soft">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">Order Details</h2>
                <Badge className="bg-green-100 text-green-800">
                  <Package className="w-3 h-3 mr-1" />
                  Confirmed
                </Badge>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-muted-foreground">Order Number</span>
                  <span className="font-mono font-medium">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-muted-foreground">Order Date</span>
                  <span>{new Date().toLocaleDateString()}</span>
                </div>
              </div>

              {/* Item Details */}
              <div className="border rounded-lg p-4">
                <div className="flex gap-4">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">by {item.seller}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-sm">Quantity: {quantity}</span>
                      <span className="font-bold text-green-600">${total?.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* What's Next */}
              <div className="space-y-3">
                <h3 className="font-semibold text-foreground">What's Next?</h3>
                <div className="space-y-2 text-sm text-foreground/80">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>You'll receive a confirmation email shortly</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>Your order will be processed within 1-2 business days</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span>You'll receive tracking information once shipped</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button 
              variant="outline" 
              className="flex-1"
              onClick={() => navigate('/marketplace')}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
            <Button 
              variant="outline" 
              className="flex-1"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Receipt
            </Button>
          </div>

          {/* Support Info */}
          <Card className="shadow-soft">
            <CardContent className="p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">
                Need help with your order?
              </p>
              <Button variant="link" className="text-green-600">
                Contact Support
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PaymentSuccess;