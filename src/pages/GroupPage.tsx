import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Settings, 
  Globe, 
  Lock, 
  Calendar, 
  Image, 
  Video, 
  MapPin, 
  Heart, 
  MessageCircle, 
  Share, 
  Crown,
  Shield,
  UserPlus,
  Bell,
  Camera,
  Edit,
  ChevronDown,
  UserMinus,
  Flag,
  Copy,
  Download,
  Trash2,
  FileText,
  Radio,
  Clapperboard,
  Send,
  Smile
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Sample group data
const groupData = {
  id: 1,
  name: "Creative Minds",
  description: "A vibrant community of designers, artists, and creative professionals sharing inspiration, tips, and collaborative opportunities.",
  coverImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop",
  avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
  members: 1284,
  privacy: "Public",
  location: "Global",
  createdDate: "January 2023",
  adminCount: 3,
  rules: [
    "Be respectful and kind to all members",
    "No spam or self-promotion without permission",
    "Share relevant and quality content only",
    "Use appropriate language and imagery",
    "Help maintain a positive community environment"
  ]
};

const posts = [
  {
    id: 1,
    author: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3ac?w=40&h=40&fit=crop",
      role: "Admin"
    },
    content: "Welcome to all our new members! 🎨 We're excited to have you join our creative community. Feel free to introduce yourself and share what type of creative work you do!",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=600&h=300&fit=crop",
    isPinned: true
  },
  {
    id: 2,
    author: {
      name: "Alex Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
      role: "Member"
    },
    content: "Just finished this logo design for a local coffee shop. Would love to get some feedback from the community! What do you think about the color palette?",
    timestamp: "4 hours ago",
    likes: 42,
    comments: 15,
    image: "https://images.unsplash.com/photo-1572044162444-ad60f128bdea?w=600&h=300&fit=crop"
  },
  {
    id: 3,
    author: {
      name: "Maya Patel",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
      role: "Moderator"
    },
    content: "Quick tip: When working with typography, remember that contrast is key for readability. Always test your designs at different sizes! 📝",
    timestamp: "6 hours ago",
    likes: 18,
    comments: 5
  }
];

const members = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3ac?w=40&h=40&fit=crop",
    role: "Admin",
    joinDate: "January 2023"
  },
  {
    id: 2,
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    role: "Member",
    joinDate: "March 2023"
  },
  {
    id: 3,
    name: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    role: "Moderator",
    joinDate: "February 2023"
  },
  {
    id: 4,
    name: "James Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop",
    role: "Member",
    joinDate: "April 2023"
  }
];

const GroupPage = () => {
  const [activeTab, setActiveTab] = useState("posts");
  const [newPost, setNewPost] = useState("");
  const [isMember, setIsMember] = useState(true);
  const [postType, setPostType] = useState("text");
  const [expandedComments, setExpandedComments] = useState<number[]>([]);
  const [newComments, setNewComments] = useState<{[key: number]: string}>({});
  const { id } = useParams();
  const navigate = useNavigate();

  const handleJoinGroup = () => {
    setIsMember(!isMember);
  };

  const handlePostClick = (postId: number) => {
    navigate(`/groups/${id}/posts/${postId}`);
  };

  const toggleComments = (postId: number) => {
    setExpandedComments(prev => 
      prev.includes(postId) 
        ? prev.filter(id => id !== postId)
        : [...prev, postId]
    );
  };

  const handleComment = (postId: number) => {
    const comment = newComments[postId];
    if (comment?.trim()) {
      // Here you would normally send the comment to your backend
      console.log("New comment:", comment);
      setNewComments(prev => ({ ...prev, [postId]: "" }));
    }
  };

  return (
    <Layout title="">
      <div 
        className="min-h-screen"
        style={{ background: 'var(--groups-bg)' }}
      >
        {/* Cover Photo and Header */}
        <div className="relative">
          <div 
            className="h-64 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${groupData.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/30" />
            <Button 
              size="icon" 
              variant="secondary" 
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white"
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          
          {/* Group Info */}
          <div className="bg-community-surface border-b border-border">
            <div className="max-w-6xl mx-auto p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="relative -mt-16">
                  <Avatar className="w-32 h-32 border-4 border-white shadow-lg">
                    <AvatarImage src={groupData.avatar} />
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                  <Button 
                    size="icon" 
                    variant="secondary" 
                    className="absolute bottom-2 right-2 w-8 h-8 bg-white hover:bg-gray-50"
                  >
                    <Edit className="w-3 h-3" />
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                    <div>
                      <h1 className="text-3xl font-bold text-foreground mb-2">{groupData.name}</h1>
                      <div className="flex items-center gap-4 text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          {groupData.privacy === "Public" ? (
                            <Globe className="w-4 h-4" />
                          ) : (
                            <Lock className="w-4 h-4" />
                          )}
                          <span className="text-sm">{groupData.privacy} group</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          <span className="text-sm">{groupData.members.toLocaleString()} members</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span className="text-sm">{groupData.location}</span>
                        </div>
                      </div>
                      <p className="text-muted-foreground max-w-2xl">{groupData.description}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      {isMember ? (
                        <>
                          <Button 
                            onClick={handleJoinGroup}
                            variant="outline" 
                            className="border-orange-300 text-orange-600 hover:bg-orange-50"
                          >
                            <Bell className="w-4 h-4 mr-2" />
                            Joined
                          </Button>
                        </>
                      ) : (
                        <Button 
                          onClick={handleJoinGroup}
                          className="bg-gradient-to-br from-orange-400 to-red-500 text-white"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Group
                        </Button>
                      )}
                        <DropdownMenu>
                         <DropdownMenuTrigger asChild>
                           <Button size="icon" variant="outline">
                             <Settings className="w-4 h-4" />
                           </Button>
                         </DropdownMenuTrigger>
                         <DropdownMenuContent align="end" className="w-48">
                           <DropdownMenuItem onClick={() => navigate(`/groups/${id}/edit`)}>
                             <Edit className="w-4 h-4 mr-2" />
                             Edit Group
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => navigate(`/groups/${id}/manage-members`)}>
                             <Users className="w-4 h-4 mr-2" />
                             Manage Members
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => navigate(`/groups/${id}/members`)}>
                             <Users className="w-4 h-4 mr-2" />
                             Group Members
                           </DropdownMenuItem>
                           <DropdownMenuItem onClick={() => navigate(`/groups/${id}/share`)}>
                             <Copy className="w-4 h-4 mr-2" />
                             Share Group
                           </DropdownMenuItem>
                           <DropdownMenuSeparator />
                           <DropdownMenuItem onClick={() => navigate(`/groups/${id}/assign-admin`)}>
                             <Crown className="w-4 h-4 mr-2" />
                             Assign an Admin
                           </DropdownMenuItem>
                           <DropdownMenuItem className="text-red-600" onClick={() => navigate(`/groups/${id}/leave`)}>
                             <UserMinus className="w-4 h-4 mr-2" />
                             Leave Group
                           </DropdownMenuItem>
                           <DropdownMenuItem className="text-red-600" onClick={() => navigate(`/groups/${id}/delete`)}>
                             <Trash2 className="w-4 h-4 mr-2" />
                             Delete Group
                           </DropdownMenuItem>
                         </DropdownMenuContent>
                       </DropdownMenu>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Area */}
        <div className="max-w-6xl mx-auto p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="posts">Posts</TabsTrigger>
              <TabsTrigger value="about">About</TabsTrigger>
              <TabsTrigger value="members">Members</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Create Post with Multiple Types */}
                  {isMember && (
                    <Card className="shadow-soft">
                      <CardContent className="p-6">
                        <div className="flex gap-3 mb-4">
                          <Avatar>
                            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" />
                            <AvatarFallback>YU</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <Textarea 
                              placeholder="Share something with the group..."
                              value={newPost}
                              onChange={(e) => setNewPost(e.target.value)}
                              className="min-h-[100px] mb-4"
                            />
                          </div>
                        </div>
                        
                        {/* Post Type Options */}
                        <div className="grid grid-cols-5 gap-2 mb-4">
                          <Button 
                            variant={postType === "text" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("text")}
                            className={postType === "text" ? "bg-gradient-to-br from-orange-400 to-red-500 text-white" : ""}
                          >
                            <FileText className="w-4 h-4 mr-2" />
                            Note
                          </Button>
                          <Button 
                            variant={postType === "photo" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("photo")}
                            className={postType === "photo" ? "bg-gradient-to-br from-orange-400 to-red-500 text-white" : ""}
                          >
                            <Image className="w-4 h-4 mr-2" />
                            Photo
                          </Button>
                          <Button 
                            variant={postType === "video" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("video")}
                            className={postType === "video" ? "bg-gradient-to-br from-orange-400 to-red-500 text-white" : ""}
                          >
                            <Video className="w-4 h-4 mr-2" />
                            Video
                          </Button>
                          <Button 
                            variant={postType === "live" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("live")}
                            className={postType === "live" ? "bg-gradient-to-br from-orange-400 to-red-500 text-white" : ""}
                          >
                            <Radio className="w-4 h-4 mr-2" />
                            Live
                          </Button>
                          <Button 
                            variant={postType === "reel" ? "default" : "outline"} 
                            size="sm"
                            onClick={() => setPostType("reel")}
                            className={postType === "reel" ? "bg-gradient-to-br from-orange-400 to-red-500 text-white" : ""}
                          >
                            <Clapperboard className="w-4 h-4 mr-2" />
                            Reel
                          </Button>
                        </div>
                        
                        <div className="flex justify-end">
                          <Button className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
                            Post {postType === "text" ? "Note" : postType.charAt(0).toUpperCase() + postType.slice(1)}
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Posts Feed */}
                  {posts.map((post) => (
                    <Card 
                      key={post.id} 
                      className="shadow-soft cursor-pointer hover:shadow-medium transition-all"
                      onClick={() => handlePostClick(post.id)}
                    >
                      <CardContent className="p-6">
                        {post.isPinned && (
                          <div className="flex items-center gap-2 mb-4 p-2 bg-orange-50 rounded-lg">
                            <Crown className="w-4 h-4 text-orange-600" />
                            <span className="text-sm text-orange-800 font-medium">Pinned Post</span>
                          </div>
                        )}
                        
                        <div className="flex gap-3 mb-4">
                          <Avatar>
                            <AvatarImage src={post.author.avatar} />
                            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <h3 className="font-semibold text-foreground">{post.author.name}</h3>
                              {post.author.role === "Admin" && (
                                <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs">
                                  Admin
                                </Badge>
                              )}
                              {post.author.role === "Moderator" && (
                                <Badge variant="outline" className="border-orange-300 text-orange-600 text-xs">
                                  <Shield className="w-3 h-3 mr-1" />
                                  Mod
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground">{post.timestamp}</p>
                          </div>
                        </div>
                        
                        <p className="text-foreground mb-4">{post.content}</p>
                        
                        {post.image && (
                          <img 
                            src={post.image} 
                            alt="Post content"
                            className="w-full rounded-lg mb-4"
                          />
                        )}
                        
                        <Separator className="mb-4" />
                        
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-4">
                          <span>{post.likes} likes</span>
                          <span>{post.comments} comments</span>
                        </div>
                        
                        <div className="flex gap-2 mb-4">
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Heart className="w-4 h-4 mr-2" />
                            Like
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            className="flex-1"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleComments(post.id);
                            }}
                          >
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Comment
                          </Button>
                          <Button variant="ghost" size="sm" className="flex-1">
                            <Share className="w-4 h-4 mr-2" />
                            Share
                          </Button>
                        </div>

                        {/* Comments Section */}
                        {expandedComments.includes(post.id) && (
                          <div className="border-t pt-4" onClick={(e) => e.stopPropagation()}>
                            {/* Comment Input */}
                            <div className="flex gap-3 mb-4">
                              <Avatar className="w-8 h-8">
                                <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop" />
                                <AvatarFallback>YU</AvatarFallback>
                              </Avatar>
                              <div className="flex-1 flex gap-2">
                                <Textarea 
                                  placeholder="Write a comment..."
                                  value={newComments[post.id] || ""}
                                  onChange={(e) => setNewComments(prev => ({ ...prev, [post.id]: e.target.value }))}
                                  className="min-h-[60px] resize-none"
                                />
                                <Button 
                                  size="icon"
                                  onClick={() => handleComment(post.id)}
                                  disabled={!newComments[post.id]?.trim()}
                                  className="bg-gradient-to-br from-orange-400 to-red-500 text-white"
                                >
                                  <Send className="w-4 h-4" />
                                </Button>
                              </div>
                            </div>
                            
                            {/* Sample Comments */}
                            <div className="space-y-3">
                              <div className="flex gap-3">
                                <Avatar className="w-8 h-8">
                                  <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop" />
                                  <AvatarFallback>AC</AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <div className="bg-community-hover rounded-lg p-3">
                                    <h4 className="font-semibold text-sm mb-1">Alex Chen</h4>
                                    <p className="text-sm">Great post! Thanks for sharing this with the community.</p>
                                  </div>
                                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                                    <button className="hover:text-foreground font-medium">Like</button>
                                    <button className="hover:text-foreground font-medium">Reply</button>
                                    <span>5 minutes ago</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  {/* Group Stats */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">Group Activity</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New posts today</span>
                        <span className="font-semibold">12</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active members</span>
                        <span className="font-semibold">156</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">New members this week</span>
                        <span className="font-semibold">23</span>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Recent Members */}
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle className="text-lg">Recent Members</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {members.slice(0, 4).map((member) => (
                          <div key={member.id} className="flex items-center gap-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={member.avatar} />
                              <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1">
                              <p className="font-medium text-sm">{member.name}</p>
                              <p className="text-xs text-muted-foreground">Joined {member.joinDate}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>About This Group</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{groupData.description}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Users className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{groupData.members.toLocaleString()} members</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">Created {groupData.createdDate}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Shield className="w-4 h-4 text-muted-foreground" />
                        <span className="text-sm">{groupData.adminCount} admins</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Group Rules</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {groupData.rules.map((rule, index) => (
                        <div key={index} className="flex gap-3">
                          <span className="text-sm font-semibold text-orange-600 min-w-[20px]">
                            {index + 1}.
                          </span>
                          <p className="text-sm text-muted-foreground">{rule}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="members">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Members ({groupData.members.toLocaleString()})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {members.map((member) => (
                      <div key={member.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-community-hover transition-smooth">
                        <Avatar>
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-medium">{member.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-sm text-muted-foreground">Joined {member.joinDate}</p>
                            {member.role === "Admin" && (
                              <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white text-xs">
                                Admin
                              </Badge>
                            )}
                            {member.role === "Moderator" && (
                              <Badge variant="outline" className="border-orange-300 text-orange-600 text-xs">
                                Mod
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="events">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Upcoming Events</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground mb-4">Be the first to create an event for this group!</p>
                    <Button className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
                      Create Event
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default GroupPage;