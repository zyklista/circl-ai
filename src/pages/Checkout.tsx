import { useState } from "react";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react";

// Sample item data - in a real app this would come from an API
const getItemById = (id: string) => {
  const items = [
    {
      id: "1",
      title: "Handcrafted Pottery Set",
      price: 45,
      originalPrice: null,
      image: "/api/placeholder/200/200",
      seller: "ArtisanCrafts"
    },
    {
      id: "2",
      title: "Vintage Camera Collection", 
      price: 120,
      originalPrice: null,
      image: "/api/placeholder/200/200",
      seller: "RetroTech"
    },
    {
      id: "3",
      title: "Organic Herb Garden Kit",
      price: 28,
      originalPrice: 40,
      image: "/api/placeholder/200/200",
      seller: "GreenThumb"
    },
    {
      id: "4",
      title: "Custom T-Shirt Design",
      price: 15,
      originalPrice: null,
      image: "/api/placeholder/200/200",
      seller: "DesignHub"
    }
  ];
  
  return items.find(item => item.id === id);
};

const Checkout = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [quantity, setQuantity] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const item = getItemById(id || "");
  const fromPage = searchParams.get('from') || 'marketplace';

  const [shippingInfo, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    zipCode: "",
    country: "US"
  });

  if (!item) {
    return (
      <Layout title="Checkout">
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Item Not Found</h1>
            <Button onClick={() => navigate('/marketplace')}>
              Back to Marketplace
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = item.price * quantity;
  const shipping = 5.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleBackClick = () => {
    if (fromPage === 'item') {
      navigate(`/marketplace/item/${id}`);
    } else {
      navigate('/marketplace');
    }
  };

  const handlePurchase = async () => {
    setIsProcessing(true);
    
    // TODO: Implement actual payment processing here
    // This is where Stripe integration would go
    
    setTimeout(() => {
      setIsProcessing(false);
      navigate('/payment-success', { 
        state: { 
          item: item,
          quantity: quantity,
          total: total
        }
      });
    }, 2000);
  };

  return (
    <Layout title="Checkout">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--marketplace-bg)' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={handleBackClick}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column - Forms */}
            <div className="space-y-6">
              {/* Shipping Information */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Truck className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        value={shippingInfo.firstName}
                        onChange={(e) => setShippingInfo({...shippingInfo, firstName: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={shippingInfo.lastName}
                        onChange={(e) => setShippingInfo({...shippingInfo, lastName: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={shippingInfo.email}
                      onChange={(e) => setShippingInfo({...shippingInfo, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="address">Address</Label>
                    <Input
                      id="address"
                      value={shippingInfo.address}
                      onChange={(e) => setShippingInfo({...shippingInfo, address: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input
                        id="city"
                        value={shippingInfo.city}
                        onChange={(e) => setShippingInfo({...shippingInfo, city: e.target.value})}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="zipCode">ZIP Code</Label>
                      <Input
                        id="zipCode"
                        value={shippingInfo.zipCode}
                        onChange={(e) => setShippingInfo({...shippingInfo, zipCode: e.target.value})}
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Method */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Method
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2 p-4 border rounded-lg">
                    <Shield className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Secure Payment</p>
                      <p className="text-sm text-muted-foreground">
                        Your payment information is encrypted and secure
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Order Summary */}
            <div className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Item Details */}
                  <div className="flex gap-4">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="text-sm text-muted-foreground">by {item.seller}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className="font-bold text-green-600">${item.price}</span>
                        {item.originalPrice && (
                          <span className="text-sm text-red-500 line-through">
                            ${item.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quantity Selector */}
                  <div className="flex items-center justify-between">
                    <Label>Quantity</Label>
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      >
                        -
                      </Button>
                      <span className="w-8 text-center">{quantity}</span>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setQuantity(quantity + 1)}
                      >
                        +
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span className="text-green-600">${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Purchase Button */}
                  <Button 
                    className="w-full bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                    onClick={handlePurchase}
                    disabled={isProcessing}
                  >
                    {isProcessing ? "Processing..." : `Complete Purchase - $${total.toFixed(2)}`}
                  </Button>

                  {/* Security Badge */}
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Shield className="w-4 h-4" />
                    <span>SSL Encrypted & Secure</span>
                  </div>
                </CardContent>
              </Card>

              {/* Trust Badges */}
              <Card className="shadow-soft">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <Badge variant="outline" className="text-xs">
                      ✓ Money Back Guarantee
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ✓ Fast Shipping
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      ✓ 24/7 Support
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;