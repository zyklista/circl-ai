import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Search, Filter, Download, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

const TransactionsList = () => {
  const navigate = useNavigate();

  const transactions = [
    {
      id: "TXN-001",
      item: "iPhone 14 Pro",
      buyer: "John Doe", 
      seller: "Tech Store",
      amount: "$999.00",
      status: "completed",
      date: "Jan 15, 2024",
      type: "purchase"
    },
    {
      id: "TXN-002", 
      item: "Designer Handbag",
      buyer: "Sarah Wilson",
      seller: "You",
      amount: "$350.00", 
      status: "shipped",
      date: "Jan 12, 2024",
      type: "sale"
    },
    {
      id: "TXN-003",
      item: "Gaming Laptop",
      buyer: "You", 
      seller: "ElectroWorld",
      amount: "$1,299.00",
      status: "processing",
      date: "Jan 10, 2024", 
      type: "purchase"
    },
    {
      id: "TXN-004",
      item: "Vintage Camera",
      buyer: "Mike Chen",
      seller: "You", 
      amount: "$475.00",
      status: "cancelled",
      date: "Jan 8, 2024",
      type: "sale"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed": return "bg-green-100 text-green-800";
      case "shipped": return "bg-blue-100 text-blue-800"; 
      case "processing": return "bg-yellow-100 text-yellow-800";
      case "cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeColor = (type: string) => {
    return type === "sale" ? "bg-green-50 text-green-700" : "bg-blue-50 text-blue-700";
  };

  return (
    <Layout title="Transactions">
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Transactions</h1>
            <p className="text-muted-foreground">View your purchase and sales history</p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <CardTitle>Transaction History</CardTitle>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <div className="relative">
                      <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
                      <Input 
                        placeholder="Search transactions..." 
                        className="pl-10 w-full sm:w-64"
                      />
                    </div>
                    <Button variant="outline">
                      <Filter className="w-4 h-4 mr-2" />
                      Filter
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map((transaction) => (
                    <div key={transaction.id} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-start gap-3 mb-2">
                            <div>
                              <h4 className="font-medium">{transaction.item}</h4>
                              <p className="text-sm text-muted-foreground">
                                Transaction ID: {transaction.id}
                              </p>
                            </div>
                            <Badge className={getTypeColor(transaction.type)}>
                              {transaction.type}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                            <div>
                              <span className="text-muted-foreground">
                                {transaction.type === "purchase" ? "Seller: " : "Buyer: "}
                              </span>
                              <span>
                                {transaction.type === "purchase" ? transaction.seller : transaction.buyer}
                              </span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Date: </span>
                              <span>{transaction.date}</span>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
                          <div className="text-right">
                            <div className="font-semibold text-lg">{transaction.amount}</div>
                            <Badge className={getStatusColor(transaction.status)}>
                              {transaction.status}
                            </Badge>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => navigate(`/transactions/${transaction.id}`)}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-3 gap-4">
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Total Purchases</h3>
                  <p className="text-2xl font-bold text-blue-600">$2,298.00</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Total Sales</h3>
                  <p className="text-2xl font-bold text-green-600">$825.00</p>
                  <p className="text-sm text-muted-foreground">This month</p>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2">Pending</h3>
                  <p className="text-2xl font-bold text-yellow-600">2</p>
                  <p className="text-sm text-muted-foreground">Transactions</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TransactionsList;