import { Layout } from "@/components/Layout";
import { CreatePost } from "@/components/CreatePost";
import { PostCard } from "@/components/PostCard";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Users, Calendar, ShoppingCart, Plus } from "lucide-react";
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

const hotPicks = [
  {
    id: 1,
    title: "Community Meetup",
    description: "Join us for networking",
    type: "event",
    gradient: "from-purple-500 to-blue-500"
  },
  {
    id: 2,
    title: "Artisan Crafts",
    description: "Handmade pottery collection",
    type: "marketplace",
    gradient: "from-orange-500 to-red-500"
  }
];

const Index = () => {
  const navigate = useNavigate();

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
              className="h-24 bg-gradient-to-br from-cyan-400 to-blue-500 text-white shadow-lg hover:shadow-xl transition-all flex flex-col items-center justify-center gap-2"
            >
              <ShoppingCart className="w-6 h-6" />
              <span className="font-semibold">Marketplace</span>
            </Button>
          </div>

          {/* Hot Picks Section */}
          <div className="space-y-4">
            <h2 className="text-2xl font-bold text-foreground">Hot Picks</h2>
            <div className="grid grid-cols-2 gap-4">
              {hotPicks.map((item) => (
                <Card key={item.id} className="shadow-lg hover:shadow-xl transition-all">
                  <CardContent className="p-0">
                    <div className={`h-24 bg-gradient-to-br ${item.gradient} text-white p-4 rounded-t-lg flex flex-col justify-center`}>
                      <h3 className="font-bold text-lg">{item.title}</h3>
                      <p className="text-sm opacity-90">{item.description}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
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
