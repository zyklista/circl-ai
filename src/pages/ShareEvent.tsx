import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft,
  Share2,
  Copy,
  Facebook,
  Twitter,
  Instagram,
  Mail,
  MessageSquare,
  Link,
  QrCode,
  Download,
  CheckCircle
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Sample event data
const eventData = {
  id: 1,
  title: "Creative Design Workshop 2024",
  description: "Join us for an immersive workshop exploring the latest trends in digital design",
  date: "December 15, 2024",
  time: "2:00 PM - 6:00 PM",
  location: "Creative Hub, Downtown",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop"
};

const ShareEvent = () => {
  const [customMessage, setCustomMessage] = useState("");
  const [email, setEmail] = useState("");
  const [emailList, setEmailList] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const eventUrl = `${window.location.origin}/events/${id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(eventUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    toast({
      title: "Link Copied!",
      description: "Event link has been copied to clipboard.",
    });
  };

  const handleSocialShare = (platform: string) => {
    const text = `Check out this event: ${eventData.title}`;
    const url = eventUrl;
    
    let shareUrl = "";
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(`${text} ${url}`)}`;
        break;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      toast({
        title: "Shared!",
        description: `Event shared on ${platform}.`,
      });
    }
  };

  const addEmail = () => {
    if (email && !emailList.includes(email)) {
      setEmailList([...emailList, email]);
      setEmail("");
    }
  };

  const removeEmail = (emailToRemove: string) => {
    setEmailList(emailList.filter(e => e !== emailToRemove));
  };

  const handleEmailShare = () => {
    if (emailList.length === 0) {
      toast({
        title: "No Recipients",
        description: "Please add at least one email address.",
        variant: "destructive"
      });
      return;
    }

    // Simulate sending emails
    toast({
      title: "Invitations Sent!",
      description: `Event invitations sent to ${emailList.length} recipients.`,
    });
    setEmailList([]);
    setCustomMessage("");
  };

  const generateQRCode = () => {
    // In a real app, you'd integrate with a QR code service
    toast({
      title: "QR Code Generated",
      description: "QR code for the event has been generated.",
    });
  };

  return (
    <Layout title="">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--events-bg)' }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(`/events/${id}`)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold">Share Event</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Preview */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft sticky top-6">
                <div className="relative">
                  <img 
                    src={eventData.image} 
                    alt={eventData.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{eventData.title}</h3>
                  <p className="text-muted-foreground mb-4">{eventData.description}</p>
                  
                  <div className="space-y-2 text-sm">
                    <div><strong>Date:</strong> {eventData.date}</div>
                    <div><strong>Time:</strong> {eventData.time}</div>
                    <div><strong>Location:</strong> {eventData.location}</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sharing Options */}
            <div className="lg:col-span-2 space-y-6">
              {/* Copy Link */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Link className="w-5 h-5 text-events-primary" />
                    Share Link
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex gap-2">
                    <Input 
                      value={eventUrl} 
                      readOnly 
                      className="flex-1 bg-gray-50"
                    />
                    <Button 
                      onClick={handleCopyLink}
                      className={`${copied ? 'bg-green-600' : 'bg-events-primary'} text-white`}
                    >
                      {copied ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Copied!
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-2" />
                          Copy
                        </>
                      )}
                    </Button>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Anyone with this link can view and join the event
                  </p>
                </CardContent>
              </Card>

              {/* Social Media */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share2 className="w-5 h-5 text-events-primary" />
                    Social Media
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <Button
                      onClick={() => handleSocialShare('facebook')}
                      className="bg-blue-600 hover:bg-blue-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                    >
                      <Facebook className="w-6 h-6" />
                      <span className="text-xs">Facebook</span>
                    </Button>
                    
                    <Button
                      onClick={() => handleSocialShare('twitter')}
                      className="bg-sky-500 hover:bg-sky-600 text-white h-16 flex flex-col items-center justify-center gap-1"
                    >
                      <Twitter className="w-6 h-6" />
                      <span className="text-xs">Twitter</span>
                    </Button>
                    
                    <Button
                      onClick={() => handleSocialShare('linkedin')}
                      className="bg-blue-700 hover:bg-blue-800 text-white h-16 flex flex-col items-center justify-center gap-1"
                    >
                      <Instagram className="w-6 h-6" />
                      <span className="text-xs">LinkedIn</span>
                    </Button>
                    
                    <Button
                      onClick={() => handleSocialShare('whatsapp')}
                      className="bg-green-600 hover:bg-green-700 text-white h-16 flex flex-col items-center justify-center gap-1"
                    >
                      <MessageSquare className="w-6 h-6" />
                      <span className="text-xs">WhatsApp</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Email Invitations */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Mail className="w-5 h-5 text-events-primary" />
                    Email Invitations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="customMessage">Custom Message (Optional)</Label>
                    <Textarea
                      id="customMessage"
                      value={customMessage}
                      onChange={(e) => setCustomMessage(e.target.value)}
                      placeholder="Add a personal message to your invitation..."
                      className="mt-1 min-h-[80px]"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email Addresses</Label>
                    <div className="flex gap-2 mt-1">
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter email address"
                        className="flex-1"
                        onKeyPress={(e) => e.key === 'Enter' && addEmail()}
                      />
                      <Button onClick={addEmail} variant="outline">
                        Add
                      </Button>
                    </div>
                  </div>

                  {emailList.length > 0 && (
                    <div className="space-y-2">
                      <Label>Recipients ({emailList.length})</Label>
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {emailList.map((email) => (
                          <div key={email} className="flex items-center justify-between p-2 bg-gray-50 rounded text-sm">
                            <span>{email}</span>
                            <button 
                              onClick={() => removeEmail(email)}
                              className="text-red-500 hover:text-red-700"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    onClick={handleEmailShare}
                    className="w-full bg-events-primary text-white hover:bg-events-primary/90"
                    disabled={emailList.length === 0}
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Send Invitations
                  </Button>
                </CardContent>
              </Card>

              {/* QR Code */}
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="w-5 h-5 text-events-primary" />
                    QR Code
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    Generate a QR code for easy sharing at physical locations
                  </p>
                  
                  <div className="flex gap-2">
                    <Button 
                      onClick={generateQRCode}
                      variant="outline" 
                      className="flex-1"
                    >
                      <QrCode className="w-4 h-4 mr-2" />
                      Generate QR Code
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
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

export default ShareEvent;