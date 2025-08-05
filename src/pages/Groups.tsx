import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Users, 
  MapPin, 
  Eye, 
  Plus, 
  Star, 
  Crown, 
  TrendingUp, 
  Megaphone,
  Search,
  Filter,
  Share2,
  Heart,
  UserPlus,
  Zap
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Live featured groups for banner
const featuredGroups = [
  {
    id: "featured1",
    name: "🚀 Startup Accelerator Network",
    description: "Join 10,000+ entrepreneurs building the future of business!",
    members: 9847,
    category: "Business",
    isLive: true,
    growth: "+500 this week"
  },
  {
    id: "featured2", 
    name: "🎨 Creative Collective Hub",
    description: "Connect with artists, designers, and creative professionals worldwide",
    members: 3400,
    category: "Arts & Design",
    isLive: false,
    growth: "+200 this week"
  }
];

const myGroups = [
  {
    id: 1,
    name: "Creative Minds",
    description: "Design & creativity enthusiasts",
    members: 128,
    category: "Design",
    status: "Open",
    role: "Creator",
    activeToday: 45,
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
  }
];

const joinedGroups = [
  {
    id: 2,
    name: "Local Entrepreneurs", 
    description: "Business networking in your area",
    members: 89,
    category: "Business",
    status: "Private",
    role: "Member",
    lastActivity: "2 hours ago",
    moderator: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c3?w=50&h=50&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop"
  }
];

const suggestedGroups = [
  {
    id: 3,
    name: "Tech Innovators",
    description: "Latest tech trends and discussions",
    members: 256,
    category: "Technology",
    status: "Open",
    rating: 4.9,
    moderator: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    name: "Digital Artists",
    description: "Share and discuss digital art",
    members: 142,
    category: "Art",
    status: "Open",
    rating: 4.7,
    moderator: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop"
  }
];

const Groups = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBannerGroup, setCurrentBannerGroup] = useState(0);

  // Auto-slide effect for featured groups
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBannerGroup((prev) => (prev + 1) % featuredGroups.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const handleJoinGroup = (groupId: number) => {
    toast({
      title: "Group Joined!",
      description: "You've successfully joined the group. Start connecting with members!",
    });
  };

  const handleShareGroup = (groupId: number) => {
    toast({
      title: "Group Shared",
      description: "Group link copied to clipboard!",
    });
  };

  const handleInviteFriends = () => {
    toast({
      title: "Invite Sent",
      description: "Invitations have been sent to your friends!",
    });
  };

  return (
    <Layout title="Groups">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--groups-bg)' }}
      >
        {/* Featured Groups Banner */}
        <div className="relative overflow-hidden bg-gradient-to-br from-orange-400 to-red-500 text-white mb-6 rounded-lg">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">FEATURED GROUPS</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {featuredGroups.map((group, index) => (
                <div 
                  key={group.id} 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">{group.name}</h3>
                    {group.isLive && (
                      <Badge className="bg-green-500 text-white animate-pulse">
                        TRENDING
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/90 text-sm mb-3">{group.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span>👥 {group.members.toLocaleString()} members</span>
                      <span>📈 {group.growth}</span>
                    </div>
                    <Button 
                      variant="secondary" 
                      size="sm"
                      onClick={() => navigate(`/groups/${group.id}`)}
                    >
                      Join Now
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <h1 className="text-3xl font-bold">Groups</h1>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button 
                className="bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg"
                onClick={() => navigate("/groups/create")}
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Group
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search groups..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="my-groups" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-groups">My Groups</TabsTrigger>
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="invite-friends">Invite Friends</TabsTrigger>
            </TabsList>

            {/* My Groups Tab */}
            <TabsContent value="my-groups" className="space-y-6">
              {/* Created Groups */}
              {myGroups.length > 0 && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5 text-orange-500" />
                      Groups I Created
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-4">
                      {myGroups.map((group) => (
                        <Card 
                          key={group.id} 
                          className="overflow-hidden hover:shadow-md transition-all cursor-pointer border-2 border-orange-200"
                          onClick={() => navigate(`/groups/${group.id}`)}
                        >
                          <div className="relative">
                            <img 
                              src={group.image} 
                              alt={group.name}
                              className="w-full h-40 object-cover"
                            />
                            <Badge 
                              className="absolute top-2 right-2 bg-gradient-to-r from-orange-400 to-red-500 text-white"
                            >
                              Creator
                            </Badge>
                          </div>
                          <CardContent className="p-4">
                            <h3 className="font-semibold mb-2">{group.name}</h3>
                            <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                            
                            <div className="space-y-2 text-sm text-muted-foreground mb-4">
                              <div className="flex items-center gap-2">
                                <Users className="w-4 h-4" />
                                {group.members} members
                              </div>
                              <div className="flex items-center gap-2">
                                <TrendingUp className="w-4 h-4 text-green-500" />
                                {group.activeToday} active today
                              </div>
                            </div>
                            
                            <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex-1"
                                onClick={() => navigate(`/groups/${group.id}/manage`)}
                              >
                                Manage
                              </Button>
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={() => handleShareGroup(group.id)}
                              >
                                <Share2 className="w-4 h-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Joined Groups */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Groups I Joined
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {joinedGroups.map((group) => (
                      <Card 
                        key={group.id} 
                        className="overflow-hidden hover:shadow-md transition-all cursor-pointer"
                        onClick={() => navigate(`/groups/${group.id}`)}
                      >
                        <div className="relative">
                          <img 
                            src={group.image} 
                            alt={group.name}
                            className="w-full h-40 object-cover"
                          />
                          <Badge 
                            className="absolute top-2 right-2"
                            variant={group.status === "Open" ? "default" : "secondary"}
                          >
                            {group.status}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{group.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={group.moderator.avatar} />
                              <AvatarFallback>{group.moderator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">by {group.moderator.name}</span>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {group.members} members
                            </div>
                            <div className="flex items-center gap-2">
                              <Eye className="w-4 h-4" />
                              Last activity: {group.lastActivity}
                            </div>
                          </div>
                          
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={() => navigate(`/groups/${group.id}/leave`)}
                            >
                              Leave
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm" 
                              onClick={() => handleShareGroup(group.id)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Discover Groups Tab */}
            <TabsContent value="discover" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Recommended for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {suggestedGroups.map((group) => (
                      <Card 
                        key={group.id} 
                        className="overflow-hidden hover:shadow-lg transition-all hover-scale cursor-pointer"
                        onClick={() => navigate(`/groups/${group.id}`)}
                      >
                        <div className="relative">
                          <img 
                            src={group.image} 
                            alt={group.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-green-100 text-green-800">
                              ⭐ {group.rating}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary">
                              {group.status}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{group.name}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={group.moderator.avatar} />
                              <AvatarFallback>{group.moderator.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">by {group.moderator.name}</span>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {group.members} members
                            </div>
                            <Badge variant="outline" className="border-orange-300 text-orange-600">
                              {group.category}
                            </Badge>
                          </div>
                          
                          <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                            <Button 
                              className="flex-1 bg-gradient-to-br from-orange-400 to-red-500 text-white"
                              onClick={() => handleJoinGroup(group.id)}
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Join Group
                            </Button>
                            <Button 
                              variant="outline" 
                              size="sm"
                              onClick={() => handleShareGroup(group.id)}
                            >
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Invite Friends Tab */}
            <TabsContent value="invite-friends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <UserPlus className="w-5 h-5 text-blue-500" />
                    Invite Friends to Join Groups
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center p-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                    <UserPlus className="w-10 h-10" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">Grow Our Community Together</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Invite your friends to discover amazing groups and connect with like-minded people in our community.
                  </p>
                  <Button 
                    size="lg" 
                    className="bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg px-8"
                    onClick={handleInviteFriends}
                  >
                    <UserPlus className="w-5 h-5 mr-2" />
                    Send Invitations
                  </Button>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Enlarge My Community */}
          <div className="flex justify-center py-12">
            <Card className="shadow-xl border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-red-50 max-w-md">
              <CardContent className="p-10 text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white mx-auto mb-6">
                  <Megaphone className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-3">Enlarge My Community</h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">Promote your group to reach more members. Advertise your community and grow your audience with targeted campaigns.</p>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <Star className="w-4 h-4 text-orange-600" />
                  <span className="text-sm bg-orange-100 text-orange-800 px-4 py-2 rounded-full font-medium">Group Promotion</span>
                </div>
                <Button size="lg" className="bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-xl px-8 py-3 text-lg">
                  <Megaphone className="w-5 h-5 mr-2" />
                  Advertise My Group
                </Button>
                <p className="text-xs text-muted-foreground mt-4">Boost visibility and attract new members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Groups;