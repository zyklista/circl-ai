import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Crown,
  Shield,
  Send,
  ThumbsUp,
  Laugh,
  Angry,
  Frown,
  ArrowLeft
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";

// Sample post data
const postData = {
  id: 1,
  author: {
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3ac?w=40&h=40&fit=crop",
    role: "Admin"
  },
  content: "Welcome to all our new members! 🎨 We're excited to have you join our creative community. Feel free to introduce yourself and share what type of creative work you do! Looking forward to seeing all the amazing projects you'll share with us.",
  timestamp: "2 hours ago",
  likes: 45,
  comments: 12,
  shares: 3,
  image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=400&fit=crop",
  isPinned: true,
  group: {
    name: "Creative Minds",
    id: 1
  }
};

const reactions = [
  { type: "like", icon: ThumbsUp, count: 32, color: "text-blue-600" },
  { type: "love", icon: Heart, count: 8, color: "text-red-600" },
  { type: "laugh", icon: Laugh, count: 3, color: "text-yellow-600" },
  { type: "angry", icon: Angry, count: 1, color: "text-red-600" },
  { type: "sad", icon: Frown, count: 1, color: "text-yellow-600" }
];

const comments = [
  {
    id: 1,
    author: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      role: "Member"
    },
    content: "Thanks for the warm welcome! I'm a graphic designer specializing in branding and logo design. Excited to learn from everyone here! 🚀",
    timestamp: "1 hour ago",
    likes: 8,
    replies: []
  },
  {
    id: 2,
    author: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
      role: "Moderator"
    },
    content: "Welcome Alex! Looking forward to seeing your work. Don't hesitate to share your projects and ask for feedback.",
    timestamp: "45 minutes ago",
    likes: 5,
    replies: [
      {
        id: 3,
        author: {
          name: "Alex Chen",
          avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
          role: "Member"
        },
        content: "Thank you! Will definitely do that 😊",
        timestamp: "30 minutes ago",
        likes: 2
      }
    ]
  },
  {
    id: 4,
    author: {
      name: "James Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
      role: "Member"
    },
    content: "This community is so supportive! I'm a UI/UX designer and I've learned so much here already.",
    timestamp: "20 minutes ago",
    likes: 12,
    replies: []
  }
];

const PostPage = () => {
  const [newComment, setNewComment] = useState("");
  const [userReaction, setUserReaction] = useState<string | null>(null);
  const [showReactions, setShowReactions] = useState(false);
  const { groupId, postId } = useParams();
  const navigate = useNavigate();

  const handleReaction = (type: string) => {
    setUserReaction(userReaction === type ? null : type);
    setShowReactions(false);
  };

  const handleComment = () => {
    if (newComment.trim()) {
      // Here you would normally send the comment to your backend
      console.log("New comment:", newComment);
      setNewComment("");
    }
  };

  return (
    <Layout title="">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--groups-bg)' }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => navigate(`/groups/${groupId}`)}
            className="border-orange-300 text-orange-600 hover:bg-orange-50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to {postData.group.name}
          </Button>

          {/* Main Post */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              {postData.isPinned && (
                <div className="flex items-center gap-2 mb-4 p-2 bg-orange-50 rounded-lg">
                  <Crown className="w-4 h-4 text-orange-600" />
                  <span className="text-sm text-orange-800 font-medium">Pinned Post</span>
                </div>
              )}
              
              <div className="flex gap-3 mb-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={postData.author.avatar} />
                  <AvatarFallback>{postData.author.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground text-lg">{postData.author.name}</h3>
                    {postData.author.role === "Admin" && (
                      <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs">
                        Admin
                      </Badge>
                    )}
                    {postData.author.role === "Moderator" && (
                      <Badge variant="outline" className="border-orange-300 text-orange-600 text-xs">
                        <Shield className="w-3 h-3 mr-1" />
                        Mod
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{postData.timestamp} • {postData.group.name}</p>
                </div>
                <Button size="icon" variant="ghost">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
              
              <p className="text-foreground mb-4 text-lg leading-relaxed">{postData.content}</p>
              
              {postData.image && (
                <img 
                  src={postData.image} 
                  alt="Post content"
                  className="w-full rounded-lg mb-4"
                />
              )}
              
              {/* Reactions Summary */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-1">
                  {reactions.filter(r => r.count > 0).map((reaction, index) => (
                    <div key={reaction.type} className={`w-6 h-6 rounded-full bg-white border-2 border-white shadow-sm flex items-center justify-center ${index > 0 ? '-ml-1' : ''}`}>
                      <reaction.icon className={`w-3 h-3 ${reaction.color}`} />
                    </div>
                  ))}
                  <span className="text-sm text-muted-foreground ml-2">{postData.likes}</span>
                </div>
                <span className="text-sm text-muted-foreground">{postData.comments} comments</span>
                <span className="text-sm text-muted-foreground">{postData.shares} shares</span>
              </div>
              
              <Separator className="mb-4" />
              
              {/* Action Buttons */}
              <div className="flex gap-2 mb-6">
                <div className="relative">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className={`flex-1 ${userReaction ? 'text-blue-600' : ''}`}
                    onMouseEnter={() => setShowReactions(true)}
                    onMouseLeave={() => setShowReactions(false)}
                    onClick={() => handleReaction('like')}
                  >
                    <Heart className="w-4 h-4 mr-2" />
                    {userReaction ? userReaction.charAt(0).toUpperCase() + userReaction.slice(1) : 'Like'}
                  </Button>
                  
                  {/* Reaction Picker */}
                  {showReactions && (
                    <div 
                      className="absolute bottom-full left-0 mb-2 bg-white border rounded-lg shadow-lg p-2 flex gap-1 z-10"
                      onMouseEnter={() => setShowReactions(true)}
                      onMouseLeave={() => setShowReactions(false)}
                    >
                      {reactions.map((reaction) => (
                        <Button
                          key={reaction.type}
                          size="icon"
                          variant="ghost"
                          className="w-8 h-8 hover:scale-125 transition-transform"
                          onClick={() => handleReaction(reaction.type)}
                        >
                          <reaction.icon className={`w-5 h-5 ${reaction.color}`} />
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
                <Button variant="ghost" size="sm" className="flex-1">
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Comment
                </Button>
                <Button variant="ghost" size="sm" className="flex-1">
                  <Share className="w-4 h-4 mr-2" />
                  Share
                </Button>
              </div>

              {/* Comment Input */}
              <div className="flex gap-3 mb-6">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" />
                  <AvatarFallback>YU</AvatarFallback>
                </Avatar>
                <div className="flex-1 flex gap-2">
                  <Textarea 
                    placeholder="Write a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="min-h-[60px] resize-none"
                  />
                  <Button 
                    size="icon"
                    onClick={handleComment}
                    disabled={!newComment.trim()}
                    className="bg-gradient-to-br from-orange-400 to-red-500 text-white"
                  >
                    <Send className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Comments */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="space-y-3">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarImage src={comment.author.avatar} />
                        <AvatarFallback>{comment.author.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-community-hover rounded-lg p-3">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-sm">{comment.author.name}</h4>
                            {comment.author.role === "Admin" && (
                              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs">
                                Admin
                              </Badge>
                            )}
                            {comment.author.role === "Moderator" && (
                              <Badge variant="outline" className="border-orange-300 text-orange-600 text-xs">
                                <Shield className="w-3 h-3 mr-1" />
                                Mod
                              </Badge>
                            )}
                          </div>
                          <p className="text-sm">{comment.content}</p>
                        </div>
                        <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                          <button className="hover:text-foreground font-medium">Like</button>
                          <button className="hover:text-foreground font-medium">Reply</button>
                          <span>{comment.timestamp}</span>
                          {comment.likes > 0 && (
                            <span className="flex items-center gap-1">
                              <Heart className="w-3 h-3 fill-current text-red-500" />
                              {comment.likes}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                    
                    {/* Replies */}
                    {comment.replies && comment.replies.length > 0 && (
                      <div className="ml-12 space-y-3">
                        {comment.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={reply.author.avatar} />
                              <AvatarFallback>{reply.author.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <div className="bg-community-hover rounded-lg p-3">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-semibold text-sm">{reply.author.name}</h4>
                                </div>
                                <p className="text-sm">{reply.content}</p>
                              </div>
                              <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                <button className="hover:text-foreground font-medium">Like</button>
                                <button className="hover:text-foreground font-medium">Reply</button>
                                <span>{reply.timestamp}</span>
                                {reply.likes > 0 && (
                                  <span className="flex items-center gap-1">
                                    <Heart className="w-3 h-3 fill-current text-red-500" />
                                    {reply.likes}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default PostPage;