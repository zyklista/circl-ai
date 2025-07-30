import { useState } from "react";
import { Heart, MessageCircle, Share, MoreHorizontal, ThumbsUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleComment = () => {
    navigate(`/post/${post.id}`);
  };

  const handleShare = () => {
    // Implement share functionality
    console.log('Share post:', post.id);
  };

  return (
    <Card className="bg-white dark:bg-slate-800 shadow-lg hover:shadow-xl transition-all border-0">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <ProfileAvatar size="md" />
            <div>
              <p className="font-semibold text-foreground">{post.author.name}</p>
              <p className="text-sm text-muted-foreground">@{post.author.handle} • {post.timestamp}</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" className="text-muted-foreground hover:bg-muted/50 h-8 w-8">
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
        <div className="flex items-center justify-around w-full">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLike}
            className={`flex items-center space-x-2 transition-all hover:bg-red-50 dark:hover:bg-red-950/20 px-4 py-2 rounded-full ${
              isLiked 
                ? 'text-red-500 hover:text-red-600' 
                : 'text-muted-foreground hover:text-red-500'
            }`}
          >
            <ThumbsUp className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
            <span className="font-medium">{likesCount}</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleComment}
            className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/20 px-4 py-2 rounded-full transition-all"
          >
            <MessageCircle className="w-4 h-4" />
            <span className="font-medium">{post.comments}</span>
          </Button>

          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleShare}
            className="flex items-center space-x-2 text-muted-foreground hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-950/20 px-4 py-2 rounded-full transition-all"
          >
            <Share className="w-4 h-4" />
            <span className="font-medium">{post.shares}</span>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}