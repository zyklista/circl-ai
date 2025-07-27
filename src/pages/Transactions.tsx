import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  ArrowLeft, 
  Calendar, 
  DollarSign, 
  User, 
  MapPin, 
  Package, 
  CreditCard,
  Eye,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const Transactions = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  
  // Mock transaction data
  const transaction = {
    id: 1,
    type: "sale",
    item: "Vintage Camera",
    description: "Rare vintage film camera in excellent condition. Perfect for photography enthusiasts and collectors.",
    amount: 245.00,
    status: "pending",
    date: "2024-01-20",
    buyer: "Alex Johnson",
    buyerAvatar: "/api/placeholder/40/40",
    buyerRating: 4.8,
    seller: "Jane Smith",
    sellerAvatar: "/api/placeholder/40/40",
    sellerRating: 4.9,
    itemImage: "/api/placeholder/300/200",
    paymentMethod: "Credit Card (*1234)",
    shippingAddress: "123 Main St, San Francisco, CA 94102",
    trackingNumber: "TRK123456789",
    estimatedDelivery: "2024-01-25"
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "pending":
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case "processing":
        return <AlertCircle className="w-5 h-5 text-blue-500" />;
      default:
        return <Clock className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-700";
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "processing":
        return "bg-blue-100 text-blue-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Layout title="Transaction Details">
      <div className="min-h-screen p-6" style={{ background: 'var(--community-bg)' }}>
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => navigate(-1)}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <h1 className="text-3xl font-bold text-foreground">Transaction Details</h1>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Transaction Info */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl">{transaction.item}</CardTitle>
                      <div className="flex items-center gap-2 mt-2">
                        {getStatusIcon(transaction.status)}
                        <Badge variant="secondary" className={getStatusColor(transaction.status)}>
                          {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-foreground">${transaction.amount}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.type === "sale" ? "You earned" : "You paid"}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <img 
                    src={transaction.itemImage} 
                    alt={transaction.item}
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <p className="text-muted-foreground">{transaction.description}</p>
                  
                  <Separator />
                  
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-foreground">Transaction ID</p>
                      <p className="text-muted-foreground">#{transaction.id.toString().padStart(8, '0')}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Date</p>
                      <p className="text-muted-foreground">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Payment Method</p>
                      <p className="text-muted-foreground">{transaction.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Tracking Number</p>
                      <p className="text-muted-foreground">{transaction.trackingNumber}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Shipping Information */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="w-5 h-5" />
                    Shipping Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <p className="font-medium text-foreground">Delivery Address</p>
                    <p className="text-muted-foreground">{transaction.shippingAddress}</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Estimated Delivery</p>
                    <p className="text-muted-foreground">{new Date(transaction.estimatedDelivery).toLocaleDateString()}</p>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Package className="w-4 h-4 mr-2" />
                    Track Package
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Other Party Info */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {transaction.type === "sale" ? "Buyer" : "Seller"}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img 
                      src={transaction.type === "sale" ? transaction.buyerAvatar : transaction.sellerAvatar}
                      alt="User"
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <p className="font-medium text-foreground">
                        {transaction.type === "sale" ? transaction.buyer : transaction.seller}
                      </p>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="text-sm text-muted-foreground">
                          {transaction.type === "sale" ? transaction.buyerRating : transaction.sellerRating}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full bg-gradient-to-br from-orange-400 to-red-500 text-white border-none hover:shadow-lg">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Message {transaction.type === "sale" ? "Buyer" : "Seller"}
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Eye className="w-4 h-4 mr-2" />
                      View Profile
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {transaction.status === "pending" && (
                    <>
                      <Button variant="outline" className="w-full">
                        Cancel Transaction
                      </Button>
                      <Button className="w-full bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg">
                        Confirm Receipt
                      </Button>
                    </>
                  )}
                  <Button variant="outline" className="w-full">
                    Download Receipt
                  </Button>
                  <Button variant="outline" className="w-full">
                    Report Issue
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;
