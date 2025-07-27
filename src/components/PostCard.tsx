import { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface PostCardProps {
  post: {
    id: string;
    author: {
      name: string;
      avatar?: string;
      handle: string;
    };
    content: string;
    image?: string;
    timestamp: string;
    likes: number;
    comments: number;
    shares: number;
  };
}

export function PostCard({ post }: PostCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card className="bg-community-surface shadow-soft hover:shadow-medium transition-smooth border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={post.author.avatar} />
              <AvatarFallback className="bg-gradient-primary text-white">
                {post.author.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-foreground">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">@{post.author.handle} • {post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-community-hover">
            <MoreHorizontal className="w-4 h-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent className="pb-4">
        <p className="text-foreground leading-relaxed mb-4">{post.content}</p>
        {post.image && (
          <img 
            src={post.image} 
            alt="Post image" 
            className="w-full rounded-lg shadow-soft"
          />
        )}
      </CardContent>

      <Separator className="opacity-50" />

      <CardFooter className="pt-4">
        <div className="flex items-center justify-between w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-smooth ${
              isLiked 
                ? 'text-primary hover:text-primary' 
                : 'text-muted-foreground hover:text-primary'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{likesCount}</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">{post.comments}</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            className="flex items-center space-x-2 text-muted-foreground hover:text-primary transition-smooth"
          >
            <Share className="w-4 h-4" />
            <span className="font-medium">{post.shares}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}