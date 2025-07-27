import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { CreatePost } from "@/components/CreatePost";
import { PostCard } from "@/components/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Calendar, ShoppingCart, Plus, TrendingUp, Tag, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // All featured groups combined for sliding
  const allFeaturedGroups = [featuredGroups.mostActive, ...featuredGroups.recommended];
  
  // Auto-slide effect
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % allFeaturedGroups.length);
    }, 3000); // Change slide every 3 seconds
    
    return () => clearInterval(interval);
  }, [allFeaturedGroups.length]);

  return (
    <Layout title="">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--home-bg)' }}
      >
        <div className="max-w-lg mx-auto space-y-6">
          {/* Welcome Header */}
          <div className="text-center space-y-4">
            <div className="w-20 h-20 mx-auto bg-gradient-to-br from-red-400 via-yellow-400 to-blue-500 rounded-full flex items-center justify-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
                <div className="grid grid-cols-3 gap-1">
                  <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-teal-400 rounded-full"></div>
                  <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                </div>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold text-foreground">Hey Juma!</h1>
              <p className="text-foreground/80">Connect & explore your circles</p>
            </div>
          </div>

          {/* Main Action Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <Button 
              onClick={() => navigate('/groups')}
              className="h-24 bg-gradient-to-br from-orange-400 to-red-500 text-white shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
            >
              <Users className="w-6 h-6" />
              <span className="font-semibold">Groups</span>
            </Button>
            <Button 
              onClick={() => navigate('/events')}
              className="h-24 bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
            >
              <Calendar className="w-6 h-6" />
              <span className="font-semibold">Events</span>
            </Button>
            <Button 
              onClick={() => navigate('/marketplace')}
              className="h-24 bg-gradient-to-br from-green-400 to-emerald-500 text-white shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-semibold">Marketplace</span>
            </Button>
          </div>

          {/* Featured Groups Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">FEATURED</h2>
            
            {/* Auto-sliding Container */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * 200}px)`,
                  width: `${allFeaturedGroups.length * 200}px`
                }}
              >
                {allFeaturedGroups.map((group, index) => (
                  <Card key={group.id || index} className="w-48 h-48 shadow-lg hover:shadow-xl transition-all flex-shrink-0 mr-4">
                    <CardContent className="p-0 h-full">
                      <div className={`h-32 bg-gradient-to-br ${group.gradient} text-white p-3 rounded-t-lg relative`}>
                        <Badge className="absolute top-2 right-2 bg-white/20 text-white text-xs">
                          {index === 0 ? "🔥" : "⭐"}
                        </Badge>
                        <div className="h-full flex flex-col justify-center">
                          <h3 className="font-bold text-lg">{group.name}</h3>
                          <p className="text-xs opacity-90">
                            {index === 0 ? "Most Active Today" : group.badge}
                          </p>
                        </div>
                      </div>
                      <div className="p-3 h-16 flex flex-col justify-between">
                        <div className="text-xs text-muted-foreground">
                          {group.members} members
                        </div>
                        <Button size="sm" className={index === 0 ? "bg-gradient-primary text-white text-xs h-7" : "text-xs h-7"} variant={index === 0 ? "default" : "outline"}>
                          Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {allFeaturedGroups.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Activity Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Activity</h2>
            <CreatePost />
            <div className="space-y-4">
              {samplePosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          </div>

          {/* Marketplace Section */}
          <div className="space-y-6">
            {/* Hot Selling */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-foreground">Hot Selling</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {marketplaceItems.hotSelling.map((item) => (
                  <Card key={item.id} className="shadow-soft hover:shadow-medium transition-all">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-24 object-cover rounded-t-lg"
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
                <h3 className="text-lg font-bold text-foreground">Discounts</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {marketplaceItems.discounts.map((item) => (
                  <Card key={item.id} className="shadow-soft hover:shadow-medium transition-all">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-24 object-cover rounded-t-lg"
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
                <h3 className="text-lg font-bold text-foreground">New Items</h3>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {marketplaceItems.newItems.map((item) => (
                  <Card key={item.id} className="shadow-soft hover:shadow-medium transition-all">
                    <CardContent className="p-0">
                      <div className="relative">
                        <img 
                          src={item.image} 
                          alt={item.title}
                          className="w-full h-24 object-cover rounded-t-lg"
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

          {/* Floating Action Button */}
          <Button 
            size="icon"
            className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-red-400 to-orange-500 text-white shadow-lg hover:shadow-xl transition-all"
          >
            <Plus className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Index;
