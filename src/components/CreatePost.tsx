import { useState } from "react";
import { Image, Smile, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from '@/hooks/use-toast';
import { rateLimiter } from '@/lib/rate-limiter';
import { useAuth } from '@/contexts/AuthContext';

export function CreatePost() {
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const { user } = useAuth();

  const handleSubmit = async () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to create a post.",
        variant: "destructive",
      });
      return;
    }

    // Rate limiting check
    if (rateLimiter.isRateLimited(`post_create_${user.id}`, 3, 5 * 60 * 1000)) {
      const remainingTime = rateLimiter.getRemainingTime(`post_create_${user.id}`);
      toast({
        title: "Rate limit exceeded",
        description: `Please wait ${Math.ceil(remainingTime / 60000)} minutes before creating another post.`,
        variant: "destructive",
      });
      return;
    }

    // Content validation
    const trimmedContent = content.trim();
    if (!trimmedContent) {
      toast({
        title: "Content required",
        description: "Please enter some content for your post.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedContent.length < 10) {
      toast({
        title: "Content too short",
        description: "Post content must be at least 10 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (trimmedContent.length > 5000) {
      toast({
        title: "Content too long",
        description: "Post content must be less than 5000 characters.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      // Handle post submission here
      console.log("Post submitted:", trimmedContent);
      setContent("");
      toast({
        title: "Post created",
        description: "Your post has been created successfully.",
      });
    } catch (error) {
      console.error('Error creating post:', error);
      toast({
        title: "Error",
        description: "Failed to create post. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
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
              maxLength={5000}
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

          <div className="flex items-center space-x-2">
            <div className="text-xs text-muted-foreground">
              {content.length}/5000
            </div>
            <Button 
              onClick={handleSubmit}
              disabled={!content.trim() || isSubmitting}
              variant="gradient"
              className="disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Posting...' : 'Post'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}