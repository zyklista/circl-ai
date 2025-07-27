import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Send, MessageCircle, Clock, Star, User } from "lucide-react";

// Sample seller data - in a real app this would come from an API
const getSellerById = (sellerId: string) => {
  const sellers = {
    "ArtisanCrafts": {
      id: "ArtisanCrafts",
      name: "Sarah Martinez",
      username: "ArtisanCrafts",
      avatar: "/api/placeholder/60/60",
      rating: 4.8,
      reviews: 156,
      responseTime: "Usually responds within 2 hours",
      joinedDate: "March 2022",
      totalSales: 89
    },
    "RetroTech": {
      id: "RetroTech", 
      name: "Mike Johnson",
      username: "RetroTech",
      avatar: "/api/placeholder/60/60",
      rating: 4.9,
      reviews: 203,
      responseTime: "Usually responds within 1 hour",
      joinedDate: "January 2021",
      totalSales: 142
    },
    "GreenThumb": {
      id: "GreenThumb",
      name: "Emma Wilson", 
      username: "GreenThumb",
      avatar: "/api/placeholder/60/60",
      rating: 4.7,
      reviews: 98,
      responseTime: "Usually responds within 4 hours",
      joinedDate: "June 2022",
      totalSales: 67
    },
    "DesignHub": {
      id: "DesignHub",
      name: "Alex Chen",
      username: "DesignHub", 
      avatar: "/api/placeholder/60/60",
      rating: 4.6,
      reviews: 234,
      responseTime: "Usually responds within 3 hours",
      joinedDate: "September 2020",
      totalSales: 178
    }
  };
  
  return sellers[sellerId as keyof typeof sellers];
};

// Sample conversation data
const getConversationMessages = (sellerId: string) => [
  {
    id: 1,
    sender: "buyer",
    message: "Hi! I'm interested in your handcrafted pottery set. Is it still available?",
    timestamp: "2 hours ago",
    read: true
  },
  {
    id: 2,
    sender: "seller",
    message: "Hello! Yes, it's still available. Thank you for your interest! Do you have any specific questions about the set?",
    timestamp: "1 hour ago", 
    read: true
  },
  {
    id: 3,
    sender: "buyer",
    message: "Great! Could you tell me more about the size of each piece? And is it microwave safe?",
    timestamp: "45 minutes ago",
    read: true
  }
];

const SellerInbox = () => {
  const { sellerId } = useParams();
  const navigate = useNavigate();
  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState(getConversationMessages(sellerId || ""));

  const seller = getSellerById(sellerId || "");

  if (!seller) {
    return (
      <Layout title="Message Seller">
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Seller Not Found</h1>
            <Button onClick={() => navigate('/marketplace')}>
              Back to Marketplace
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  const sendMessage = () => {
    if (newMessage.trim()) {
      const message = {
        id: Date.now(),
        sender: "buyer" as const,
        message: newMessage.trim(),
        timestamp: "Just now",
        read: false
      };
      setMessages([...messages, message]);
      setNewMessage("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <Layout title={`Message ${seller.name}`}>
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--marketplace-bg)' }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Header */}
          <Button 
            variant="outline" 
            onClick={() => navigate('/marketplace')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Seller Info Sidebar */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    Seller Profile
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <img 
                      src={seller.avatar} 
                      alt={seller.name}
                      className="w-16 h-16 rounded-full mx-auto mb-3"
                    />
                    <h3 className="font-semibold text-foreground">{seller.name}</h3>
                    <p className="text-sm text-muted-foreground">@{seller.username}</p>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{seller.rating}</span>
                      <span className="text-sm text-muted-foreground">({seller.reviews} reviews)</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">{seller.responseTime}</span>
                    </div>

                    <div className="space-y-1 text-sm">
                      <p><span className="font-medium">Joined:</span> {seller.joinedDate}</p>
                      <p><span className="font-medium">Total Sales:</span> {seller.totalSales}</p>
                    </div>
                  </div>

                  <Button variant="outline" className="w-full">
                    View Profile
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Chat Interface */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft h-[600px] flex flex-col">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5" />
                    Conversation with {seller.name}
                  </CardTitle>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 space-y-4">
                    {messages.map((msg) => (
                      <div 
                        key={msg.id}
                        className={`flex ${msg.sender === 'buyer' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[70%] p-3 rounded-lg ${
                          msg.sender === 'buyer' 
                            ? 'bg-green-500 text-white' 
                            : 'bg-muted'
                        }`}>
                          <p className="text-sm">{msg.message}</p>
                          <p className={`text-xs mt-1 ${
                            msg.sender === 'buyer' ? 'text-green-100' : 'text-muted-foreground'
                          }`}>
                            {msg.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t p-4">
                    <div className="flex gap-2">
                      <Textarea
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                        rows={2}
                        className="flex-1 resize-none"
                      />
                      <Button 
                        onClick={sendMessage}
                        disabled={!newMessage.trim()}
                        className="bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                      >
                        <Send className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Press Enter to send, Shift+Enter for new line
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Quick Actions */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex gap-4">
                <Button variant="outline" className="flex-1">
                  Report User
                </Button>
                <Button variant="outline" className="flex-1">
                  Block User
                </Button>
                <Button className="flex-1 bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                  Make an Offer
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default SellerInbox;