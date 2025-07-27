import { useState } from "react";
import { Image, Smile, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";

export function CreatePost() {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (content.trim()) {
      // Handle post submission here
      console.log("Post submitted:", content);
      setContent("");
    }
  };

  return (
    <Card className="bg-community-surface shadow-soft border-0 mb-6">
      <CardHeader className="pb-3">
        <div className="flex items-center space-x-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src="/api/placeholder/40/40" />
            <AvatarFallback className="bg-gradient-primary text-white">
              U
            </AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <Textarea
              placeholder="What's happening in your community?"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="border-0 bg-community-bg resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-1 focus-visible:ring-primary"
              rows={3}
            />
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="sm" className="text-primary hover:bg-community-hover">
              <Image className="w-4 h-4 mr-2" />
              Photo
            </Button>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-community-hover">
              <Smile className="w-4 h-4 mr-2" />
              Emoji
            </Button>
            <Button variant="ghost" size="sm" className="text-primary hover:bg-community-hover">
              <MapPin className="w-4 h-4 mr-2" />
              Location
            </Button>
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!content.trim()}
            variant="gradient"
            className="disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4 mr-2" />
            Post
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}