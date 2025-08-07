import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CreatePost } from "@/components/CreatePost";
import { PostCard } from "@/components/PostCard";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { JoinedGroups } from "@/components/JoinedGroups";
import { FloatingActions } from "@/components/FloatingActions";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Calendar, ShoppingCart, Plus, TrendingUp, Tag, Sparkles, ArrowRight, Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

// Sample post data
const samplePosts = [
  {
    id: "1",
    author: {
      name: "Alex Chen",
      handle: "alexchen",
      avatar: "/api/placeholder/40/40"
    },
    content: "Just launched our new community feature! 🚀 Excited to see how everyone will use it to connect and share amazing content. What's the first thing you'd like to post?",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3
  }
];

const featuredGroups = {
  mostActive: {
    id: 1,
    name: "Creative Minds",
    description: "125 members • 45 active today",
    members: 125,
    activeToday: 45,
    gradient: "from-purple-500 to-blue-500",
    badge: "🔥 Most Active"
  },
  recommended: [
    {
      id: 2,
      name: "Tech Innovators",
      description: "Latest tech trends and discussions",
      members: 256,
      gradient: "from-orange-500 to-red-500",
      badge: "Recommended"
    },
    {
      id: 3,
      name: "Local Entrepreneurs",
      description: "Business networking in your area",
      members: 89,
      gradient: "from-green-500 to-teal-500",
      badge: "For You"
    }
  ]
};

const marketplaceItems = {
  hotSelling: [
    {
      id: 1,
      title: "Handcrafted Pottery Set",
      price: "$45",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop",
      badge: "🔥 Hot"
    },
    {
      id: 2,
      title: "Innovation Light Bulb",
      price: "$25",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?w=200&h=200&fit=crop",
      badge: "⭐ Best Seller"
    }
  ],
  discounts: [
    {
      id: 3,
      title: "Garden Light Set",
      price: "$30",
      originalPrice: "$50",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=200&h=200&fit=crop",
      badge: "40% OFF"
    },
    {
      id: 4,
      title: "Orange Flowers Bundle",
      price: "$15",
      originalPrice: "$25",
      image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=200&h=200&fit=crop",
      badge: "40% OFF"
    }
  ],
  newItems: [
    {
      id: 5,
      title: "Cozy Pet Blanket",
      price: "$35",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=200&h=200&fit=crop",
      badge: "🆕 New"
    },
    {
      id: 6,
      title: "Artisan Bowl Set",
      price: "$60",
      originalPrice: null,
      image: "https://images.unsplash.com/photo-1618160702438-9b02ab6515c9?w=200&h=200&fit=crop",
      badge: "🆕 New"
    }
  ]
};

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [coverPhoto, setCoverPhoto] = useState("/api/placeholder/800/300");
  
  // All featured groups combined for sliding
  const allFeaturedGroups = [featuredGroups.mostActive, ...featuredGroups.recommended];
  
  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allFeaturedGroups.length);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [allFeaturedGroups.length]);

  return (
    <Layout title="">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Cover Photo Section - Facebook Style */}
        <Card className="shadow-soft overflow-hidden">
          <div className="relative h-48 md:h-64 bg-gradient-to-r from-blue-400 to-purple-500">
            <img 
              src={coverPhoto} 
              alt="Cover" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/20"></div>
            <label className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full cursor-pointer transition-colors">
              <Camera className="w-4 h-4 text-gray-700" />
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleCoverPhotoChange}
                className="hidden" 
              />
            </label>
          </div>
          
          <CardContent className="p-6 relative">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex flex-col items-center md:items-start -mt-16 md:-mt-20">
                <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-lg">
                  <AvatarImage src="/api/placeholder/128/128" />
                  <AvatarFallback>JS</AvatarFallback>
                </Avatar>
              </div>
              
              <div className="flex-1 text-center md:text-left md:mt-16">
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, {user?.user_metadata?.display_name || "User"}!
                </h1>
                <p className="text-muted-foreground">Your personal network dashboard</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-6">
            {/* Quick Actions */}
            <div className="grid grid-cols-3 gap-4">
              <Card 
                onClick={() => navigate('/groups')}
                className="p-4 hover:shadow-lg transition-all cursor-pointer border-orange-200 bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-2xl flex items-center justify-center mx-auto">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">Groups</span>
                </div>
              </Card>
              
              <Card 
                onClick={() => navigate('/events')}
                className="p-4 hover:shadow-lg transition-all cursor-pointer border-blue-200 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">Events</span>
                </div>
              </Card>
              
              <Card 
                onClick={() => navigate('/marketplace')}
                className="p-4 hover:shadow-lg transition-all cursor-pointer border-green-200 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20"
              >
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto">
                    <ShoppingCart className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-semibold text-sm text-foreground">Marketplace</span>
                </div>
              </Card>
            </div>

            {/* Featured Groups Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold text-foreground">Recommended Groups</h2>
                <Button variant="outline" onClick={() => navigate('/groups')}>
                  <ArrowRight className="w-4 h-4 ml-2" />
                  View All
                </Button>
              </div>
              
              {/* Groups Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allFeaturedGroups.map((group, index) => (
                  <Card key={group.id || index} className="hover:shadow-lg transition-all cursor-pointer">
                    <CardContent className="p-0">
                      <div className={`h-32 bg-gradient-to-br ${group.gradient} text-white p-4 rounded-t-lg relative`}>
                        <Badge className="absolute top-2 right-2 bg-white/20 text-white text-xs">
                          {index === 0 ? "🔥 Most Active" : "⭐ Recommended"}
                        </Badge>
                        <div className="h-full flex flex-col justify-center">
                          <h3 className="font-bold text-lg">{group.name}</h3>
                          <p className="text-xs opacity-90">{group.description}</p>
                        </div>
                      </div>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="text-sm text-muted-foreground">
                            {group.members} members
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-primary to-accent text-white"
                            onClick={() => navigate('/groups')}
                          >
                            Join
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Expanded Activity Feed */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-foreground">Recent Activity</h2>
              <CreatePost />
              
              {/* Activity Stats */}
              <div className="grid grid-cols-3 gap-4 p-4 bg-muted/50 rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-sm text-muted-foreground">Posts Today</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">48</div>
                  <div className="text-sm text-muted-foreground">Total Likes</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">16</div>
                  <div className="text-sm text-muted-foreground">Comments</div>
                </div>
              </div>

              {/* Recent Posts */}
              <div className="space-y-4">
                {samplePosts.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
                
                {/* Show more sample activity */}
                <div className="space-y-4">
                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">M</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">Maria Rodriguez</span>
                          <span className="text-sm text-muted-foreground">joined Creative Minds group</span>
                          <span className="text-sm text-muted-foreground">4 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </Card>

                  <Card className="p-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold">J</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-semibold">John Smith</span>
                          <span className="text-sm text-muted-foreground">purchased Handcrafted Pottery Set</span>
                          <span className="text-sm text-muted-foreground">6 hours ago</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
            </div>
        </div>

        {/* Marketplace Section */}
        <div className="space-y-6">
          {/* Hot Selling */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-foreground">Hot Selling</h3>
              </div>
              <Button variant="outline" onClick={() => navigate('/marketplace')}>
                View All
              </Button>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {marketplaceItems.hotSelling.slice(0, 4).map((item) => (
                <Card 
                  key={item.id} 
                  className="shadow-soft hover:shadow-medium transition-all cursor-pointer"
                  onClick={() => navigate(`/marketplace/item/${item.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white text-xs">
                        {item.badge}
                      </Badge>
                    </div>
                     <div className="p-3">
                       <h4 className="font-medium text-sm text-foreground truncate">{item.title}</h4>
                       <p className="font-bold text-green-600">{item.price}</p>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Discounts */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Tag className="w-5 h-5 text-orange-500" />
              <h3 className="text-lg font-bold text-foreground">Special Offers</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {marketplaceItems.discounts.slice(0, 4).map((item) => (
                <Card 
                  key={item.id} 
                  className="shadow-soft hover:shadow-medium transition-all cursor-pointer"
                  onClick={() => navigate(`/marketplace/item/${item.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-orange-500 text-white text-xs">
                        {item.badge}
                      </Badge>
                    </div>
                     <div className="p-3">
                       <h4 className="font-medium text-sm text-foreground truncate">{item.title}</h4>
                       <div className="flex items-center gap-2">
                         <p className="font-bold text-green-600">{item.price}</p>
                         {item.originalPrice && (
                           <p className="text-xs text-red-500 line-through">{item.originalPrice}</p>
                         )}
                       </div>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* New Items */}
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-500" />
              <h3 className="text-lg font-bold text-foreground">Latest Arrivals</h3>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
              {marketplaceItems.newItems.slice(0, 4).map((item) => (
                <Card 
                  key={item.id} 
                  className="shadow-soft hover:shadow-medium transition-all cursor-pointer"
                  onClick={() => navigate(`/marketplace/item/${item.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      <Badge className="absolute top-2 left-2 bg-blue-500 text-white text-xs">
                        {item.badge}
                      </Badge>
                    </div>
                     <div className="p-3">
                       <h4 className="font-medium text-sm text-foreground truncate">{item.title}</h4>
                       <p className="font-bold text-green-600">{item.price}</p>
                     </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Floating AI Support */}
        <FloatingActions />
      </div>
    </Layout>
  );
};

export default Index;
