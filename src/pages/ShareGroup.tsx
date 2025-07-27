import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Copy, Share2, Mail, MessageCircle, Facebook, Twitter, Instagram } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function ShareGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [groupLink] = useState(`https://community.app/groups/${id}`);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(groupLink);
    toast({
      title: "Link Copied",
      description: "Group link has been copied to clipboard.",
    });
  };

  const handleShare = (platform: string) => {
    toast({
      title: "Sharing",
      description: `Opening ${platform} to share the group.`,
    });
  };

  return (
    <Layout title="Share Group">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/groups/${id}`)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Share Group</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Share Creative Minds</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Group Link */}
            <div className="space-y-2">
              <h3 className="font-medium">Group Link</h3>
              <div className="flex gap-2">
                <Input value={groupLink} readOnly />
                <Button onClick={handleCopyLink} variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
            </div>

            {/* Quick Share Options */}
            <div className="space-y-4">
              <h3 className="font-medium">Quick Share</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  className="flex flex-col gap-2 h-auto p-4"
                  onClick={() => handleShare("Email")}
                >
                  <Mail className="w-6 h-6" />
                  <span className="text-sm">Email</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col gap-2 h-auto p-4"
                  onClick={() => handleShare("Messages")}
                >
                  <MessageCircle className="w-6 h-6" />
                  <span className="text-sm">Messages</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col gap-2 h-auto p-4"
                  onClick={() => handleShare("Facebook")}
                >
                  <Facebook className="w-6 h-6" />
                  <span className="text-sm">Facebook</span>
                </Button>
                
                <Button 
                  variant="outline" 
                  className="flex flex-col gap-2 h-auto p-4"
                  onClick={() => handleShare("Twitter")}
                >
                  <Twitter className="w-6 h-6" />
                  <span className="text-sm">Twitter</span>
                </Button>
              </div>
            </div>

            {/* Invite Code */}
            <div className="space-y-2">
              <h3 className="font-medium">Invite Code</h3>
              <div className="flex gap-2">
                <Input value="CREATIVE2024" readOnly />
                <Button variant="outline">
                  <Copy className="w-4 h-4 mr-2" />
                  Copy
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Share this code with friends so they can easily join the group.
              </p>
            </div>

            {/* Share Message Template */}
            <div className="space-y-2">
              <h3 className="font-medium">Share Message</h3>
              <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm">
                  "Hey! I thought you'd be interested in joining our Creative Minds community. 
                  It's a great place for designers and artists to share ideas and collaborate. 
                  Join us at: {groupLink}"
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}