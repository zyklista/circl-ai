import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, TrendingUp, TrendingDown, Calendar, Receipt } from "lucide-react";

const transactions = [
  {
    id: 1,
    type: "purchase",
    item: "Handcrafted Pottery Set",
    amount: "$45.00",
    date: "2024-01-20",
    status: "completed",
    seller: "ArtisanCrafts",
    transactionId: "TXN-001"
  },
  {
    id: 2,
    type: "sale",
    item: "Custom T-Shirt Design",
    amount: "$15.00",
    date: "2024-01-18",
    status: "completed",
    buyer: "FashionLover22",
    transactionId: "TXN-002"
  },
  {
    id: 3,
    type: "purchase",
    item: "Vintage Camera Collection",
    amount: "$120.00",
    date: "2024-01-15",
    status: "pending",
    seller: "RetroTech",
    transactionId: "TXN-003"
  },
  {
    id: 4,
    type: "sale",
    item: "Organic Herb Garden Kit",
    amount: "$28.00",
    date: "2024-01-12",
    status: "completed",
    buyer: "GreenThumb",
    transactionId: "TXN-004"
  }
];

const Transactions = () => {
  const totalPurchases = transactions.filter(t => t.type === "purchase").reduce((sum, t) => sum + parseFloat(t.amount.replace("$", "")), 0);
  const totalSales = transactions.filter(t => t.type === "sale").reduce((sum, t) => sum + parseFloat(t.amount.replace("$", "")), 0);

  return (
    <Layout title="Transactions">
      <div className="min-h-screen p-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-6xl mx-auto space-y-6">
          <h1 className="text-3xl font-bold text-foreground">Transaction History</h1>

          {/* Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Purchases</p>
                    <p className="text-2xl font-bold text-foreground">${totalPurchases.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-red-100 rounded-full">
                    <TrendingDown className="w-6 h-6 text-red-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Total Sales</p>
                    <p className="text-2xl font-bold text-foreground">${totalSales.toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-full">
                    <TrendingUp className="w-6 h-6 text-green-600" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">Net Balance</p>
                    <p className="text-2xl font-bold text-foreground">${(totalSales - totalPurchases).toFixed(2)}</p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-full">
                    <Receipt className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Transactions List */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-community-hover transition-smooth">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-full ${
                        transaction.type === "purchase" ? "bg-red-100" : "bg-green-100"
                      }`}>
                        {transaction.type === "purchase" ? (
                          <ShoppingCart className={`w-5 h-5 ${
                            transaction.type === "purchase" ? "text-red-600" : "text-green-600"
                          }`} />
                        ) : (
                          <TrendingUp className="w-5 h-5 text-green-600" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-foreground">{transaction.item}</h3>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Calendar className="w-4 h-4" />
                          <span>{transaction.date}</span>
                          <span>•</span>
                          <span>
                            {transaction.type === "purchase" ? "from" : "to"}{" "}
                            {transaction.type === "purchase" ? transaction.seller : transaction.buyer}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground">ID: {transaction.transactionId}</p>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <p className={`font-semibold ${
                        transaction.type === "purchase" ? "text-red-600" : "text-green-600"
                      }`}>
                        {transaction.type === "purchase" ? "-" : "+"}{transaction.amount}
                      </p>
                      <Badge 
                        variant={transaction.status === "completed" ? "default" : "secondary"}
                        className={transaction.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                      >
                        {transaction.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-center mt-6">
                <Button variant="outline">Load More Transactions</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Transactions;