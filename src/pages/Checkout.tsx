import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft, 
  CreditCard, 
  Plus, 
  Trash2, 
  Shield, 
  MapPin,
  Package,
  DollarSign
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCard, setSelectedCard] = useState("1");
  const [addingNewCard, setAddingNewCard] = useState(false);
  const [newCard, setNewCard] = useState({
    number: "",
    expiry: "",
    cvv: "",
    name: ""
  });

  // Mock payment methods
  const paymentMethods = [
    { id: "1", type: "Visa", last4: "1234", expiry: "12/26", isDefault: true },
    { id: "2", type: "Mastercard", last4: "5678", expiry: "08/25", isDefault: false }
  ];

  // Mock item data
  const item = {
    id: 1,
    title: "Vintage Camera",
    seller: "Jane Smith",
    price: 245.00,
    shipping: 15.00,
    tax: 20.80,
    image: "/api/placeholder/150/100"
  };

  const total = item.price + item.shipping + item.tax;

  const handleAddCard = () => {
    if (!newCard.number || !newCard.expiry || !newCard.cvv || !newCard.name) {
      toast({
        title: "Missing Information",
        description: "Please fill in all card details.",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Card Added",
      description: "Your payment method has been added successfully."
    });
    setAddingNewCard(false);
    setNewCard({ number: "", expiry: "", cvv: "", name: "" });
  };

  const handleDeleteCard = (cardId: string) => {
    toast({
      title: "Card Removed",
      description: "Payment method has been removed from your account."
    });
  };

  const handleCheckout = () => {
    toast({
      title: "Processing Payment",
      description: "Redirecting to secure payment..."
    });
    // Simulate payment processing
    setTimeout(() => {
      navigate("/payment-success");
    }, 2000);
  };

  return (
    <Layout title="Checkout">
      <div className="min-h-screen p-6" style={{ background: 'var(--community-bg)' }}>
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Checkout</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Payment Methods */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    Payment Methods
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Existing Cards */}
                  {paymentMethods.map((method) => (
                    <div key={method.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="payment"
                          value={method.id}
                          checked={selectedCard === method.id}
                          onChange={(e) => setSelectedCard(e.target.value)}
                          className="w-4 h-4"
                        />
                        <div className="flex items-center gap-2">
                          <CreditCard className="w-5 h-5 text-muted-foreground" />
                          <div>
                            <p className="font-medium">{method.type} •••• {method.last4}</p>
                            <p className="text-sm text-muted-foreground">Expires {method.expiry}</p>
                          </div>
                        </div>
                        {method.isDefault && (
                          <span className="px-2 py-1 text-xs bg-primary/10 text-primary rounded">Default</span>
                        )}
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteCard(method.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}

                  {/* Add New Card */}
                  {!addingNewCard ? (
                    <Button
                      variant="outline"
                      onClick={() => setAddingNewCard(true)}
                      className="w-full h-16 border-dashed"
                    >
                      <Plus className="w-5 h-5 mr-2" />
                      Add New Card
                    </Button>
                  ) : (
                    <div className="p-4 border rounded-lg space-y-4">
                      <h4 className="font-medium">Add New Payment Method</h4>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                          <Label htmlFor="cardNumber">Card Number</Label>
                          <Input
                            id="cardNumber"
                            placeholder="1234 5678 9012 3456"
                            value={newCard.number}
                            onChange={(e) => setNewCard(prev => ({ ...prev, number: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input
                            id="expiry"
                            placeholder="MM/YY"
                            value={newCard.expiry}
                            onChange={(e) => setNewCard(prev => ({ ...prev, expiry: e.target.value }))}
                          />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input
                            id="cvv"
                            placeholder="123"
                            value={newCard.cvv}
                            onChange={(e) => setNewCard(prev => ({ ...prev, cvv: e.target.value }))}
                          />
                        </div>
                        <div className="col-span-2">
                          <Label htmlFor="cardName">Cardholder Name</Label>
                          <Input
                            id="cardName"
                            placeholder="John Doe"
                            value={newCard.name}
                            onChange={(e) => setNewCard(prev => ({ ...prev, name: e.target.value }))}
                          />
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={handleAddCard} className="bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg">
                          Add Card
                        </Button>
                        <Button variant="outline" onClick={() => setAddingNewCard(false)}>
                          Cancel
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Shipping Address */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Address
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>First Name</Label>
                      <Input placeholder="John" />
                    </div>
                    <div>
                      <Label>Last Name</Label>
                      <Input placeholder="Doe" />
                    </div>
                  </div>
                  <div>
                    <Label>Address Line 1</Label>
                    <Input placeholder="123 Main Street" />
                  </div>
                  <div>
                    <Label>Address Line 2 (Optional)</Label>
                    <Input placeholder="Apartment, suite, etc." />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <Label>City</Label>
                      <Input placeholder="San Francisco" />
                    </div>
                    <div>
                      <Label>State</Label>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="CA" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>ZIP Code</Label>
                      <Input placeholder="94102" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Order Summary */}
            <div>
              <Card className="shadow-soft sticky top-6">
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-3">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-sm">{item.title}</p>
                      <p className="text-xs text-muted-foreground">by {item.seller}</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Item price</span>
                      <span>${item.price.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>${item.shipping.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${item.tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-medium text-lg">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="terms" />
                      <label htmlFor="terms" className="text-sm text-muted-foreground">
                        I agree to the terms and conditions
                      </label>
                    </div>

                    <Button 
                      onClick={handleCheckout}
                      className="w-full bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg"
                    >
                      <Shield className="w-4 h-4 mr-2" />
                      Complete Purchase
                    </Button>

                    <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      <span>Secure checkout powered by Stripe</span>
                    </div>
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
