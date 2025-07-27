import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Share2, Copy, Facebook, Twitter, Mail, MessageCircle, Check } from "lucide-react";

// Sample item data - in a real app this would come from an API
const getItemById = (id: string) => {
  const items = [
    {
      id: "1",
      title: "Handcrafted Pottery Set",
      price: "$45",
      image: "/api/placeholder/200/200",
      seller: "ArtisanCrafts"
    },
    {
      id: "2", 
      title: "Vintage Camera Collection",
      price: "$120",
      image: "/api/placeholder/200/200",
      seller: "RetroTech"
    },
    {
      id: "3",
      title: "Organic Herb Garden Kit", 
      price: "$28",
      image: "/api/placeholder/200/200",
      seller: "GreenThumb"
    },
    {
      id: "4",
      title: "Custom T-Shirt Design",
      price: "$15", 
      image: "/api/placeholder/200/200",
      seller: "DesignHub"
    }
  ];
  
  return items.find(item => item.id === id);
};

const ShareItem = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [emailData, setEmailData] = useState({
    to: "",
    message: ""
  });

  const item = getItemById(id || "");
  const itemUrl = `${window.location.origin}/marketplace/item/${id}`;

  if (!item) {
    return (
      <Layout title="Share Item">
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

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(itemUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  };

  const shareViaFacebook = () => {
    const url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(itemUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareViaTwitter = () => {
    const text = `Check out this ${item.title} for ${item.price}!`;
    const url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(itemUrl)}`;
    window.open(url, '_blank', 'width=600,height=400');
  };

  const shareViaWhatsApp = () => {
    const text = `Check out this ${item.title} for ${item.price}! ${itemUrl}`;
    const url = `https://wa.me/?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  const shareViaEmail = () => {
    const subject = `Check out this ${item.title}`;
    const body = `Hi,\n\nI found this interesting item and thought you might like it:\n\n${item.title}\nPrice: ${item.price}\nSeller: ${item.seller}\n\nView it here: ${itemUrl}`;
    const url = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(url);
  };

  const sendCustomEmail = () => {
    // In a real app, you'd send this via your backend
    console.log("Sending email to:", emailData.to, "Message:", emailData.message);
    setEmailData({ to: "", message: "" });
  };

  return (
    <Layout title="Share Item">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--marketplace-bg)' }}
      >
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Header */}
          <Button 
            variant="outline" 
            onClick={() => navigate(`/marketplace/item/${id}`)}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Item
          </Button>

          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-foreground">Share This Item</h1>
            <p className="text-foreground/80">Spread the word about this great find</p>
          </div>

          {/* Item Preview */}
          <Card className="shadow-soft">
            <CardContent className="p-4">
              <div className="flex gap-4">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">by {item.seller}</p>
                  <span className="font-bold text-green-600">{item.price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Copy Link */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Copy className="w-5 h-5" />
                Copy Link
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  value={itemUrl} 
                  readOnly
                  className="flex-1"
                />
                <Button onClick={copyToClipboard} className="bg-gradient-to-br from-green-400 to-emerald-500 text-white">
                  {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                </Button>
              </div>
              {copied && (
                <Badge className="bg-green-100 text-green-800">
                  Link copied to clipboard!
                </Badge>
              )}
            </CardContent>
          </Card>

          {/* Social Sharing */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                Share on Social Media
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <Button 
                  variant="outline" 
                  onClick={shareViaFacebook}
                  className="flex items-center gap-2"
                >
                  <Facebook className="w-4 h-4" />
                  Facebook
                </Button>
                <Button 
                  variant="outline" 
                  onClick={shareViaTwitter}
                  className="flex items-center gap-2"
                >
                  <Twitter className="w-4 h-4" />
                  Twitter
                </Button>
                <Button 
                  variant="outline" 
                  onClick={shareViaWhatsApp}
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  WhatsApp
                </Button>
                <Button 
                  variant="outline" 
                  onClick={shareViaEmail}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  Email
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Custom Email */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="w-5 h-5" />
                Send Custom Email
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Input
                  placeholder="Recipient's email"
                  value={emailData.to}
                  onChange={(e) => setEmailData({...emailData, to: e.target.value})}
                />
              </div>
              <div>
                <Textarea
                  placeholder="Add a personal message..."
                  value={emailData.message}
                  onChange={(e) => setEmailData({...emailData, message: e.target.value})}
                  rows={3}
                />
              </div>
              <Button 
                onClick={sendCustomEmail}
                disabled={!emailData.to}
                className="w-full bg-gradient-to-br from-green-400 to-emerald-500 text-white"
              >
                Send Email
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ShareItem;