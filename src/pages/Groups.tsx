import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Eye, Plus, Star, Crown, TrendingUp, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

const myGroups = [
  {
    id: 1,
    name: "Creative Minds",
    description: "Design & creativity enthusiasts",
    members: 128,
    category: "Design",
    status: "Open",
    role: "Creator",
    activeToday: 45
  }
];

const groups = [
  {
    id: 2,
    name: "Local Entrepreneurs", 
    description: "Business networking in your area",
    members: 89,
    category: "Business",
    isJoined: true,
    status: "Private"
  }
];

const suggestedGroups = [
  {
    id: 3,
    name: "Tech Innovators",
    description: "Latest tech trends and discussions",
    members: 256,
    category: "Technology",
    isJoined: false,
    status: "Open"
  },
  {
    id: 4,
    name: "Digital Artists",
    description: "Share and discuss digital art",
    members: 142,
    category: "Art",
    isJoined: false,
    status: "Open"
  },
  {
    id: 5,
    name: "Startup Founders",
    description: "Connect with fellow entrepreneurs",
    members: 98,
    category: "Business",
    isJoined: false,
    status: "Open"
  }
];

const Groups = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // Auto-slide effect for suggested groups
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % suggestedGroups.length);
    }, 4000); // Change slide every 4 seconds
    
    return () => clearInterval(interval);
  }, []);

  const handleViewGroup = (groupId: number) => {
    navigate(`/groups/${groupId}`);
  };

  return (
    <Layout title="Groups">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--groups-bg)' }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Groups</h1>
            <Button className="bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg">
              <Plus className="w-4 h-4 mr-2" />
              Create Group
            </Button>
          </div>

          <div className="grid gap-4">
            {/* My Groups (Creator) */}
            {myGroups.length > 0 && (
              <>
                <h2 className="text-xl font-semibold text-foreground">My Groups</h2>
                {myGroups.map((group) => (
                  <Card key={group.id} className="shadow-soft hover:shadow-medium transition-smooth border-2 border-orange-200">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                              Creator
                            </Badge>
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                              {group.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{group.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {group.members} members
                            </div>
                            <div className="flex items-center gap-1">
                              <TrendingUp className="w-4 h-4 text-green-500" />
                              {group.activeToday} active today
                            </div>
                            <Badge variant="outline" className="border-orange-300 text-orange-600">{group.category}</Badge>
                          </div>
                        </div>
                        <Button 
                          className="bg-gradient-to-br from-orange-400 to-red-500 text-white"
                          onClick={() => handleViewGroup(group.id)}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          Manage
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </>
            )}

            <h2 className="text-xl font-semibold text-foreground">Joined Groups</h2>
            {groups.filter(group => group.isJoined).map((group) => (
              <Card key={group.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                        <Badge className={group.status === "Open" ? "bg-gradient-to-r from-orange-400 to-red-500 text-white" : "bg-gradient-to-r from-orange-300 to-red-400 text-white"}>
                          {group.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {group.members} members
                        </div>
                        <Badge variant="outline" className="border-orange-300 text-orange-600">{group.category}</Badge>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="border-orange-300 text-orange-600 hover:bg-orange-50"
                      onClick={() => handleViewGroup(group.id)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <h2 className="text-xl font-semibold text-foreground mt-8">Suggested Groups</h2>
            
            {/* Auto-sliding Suggested Groups */}
            <div className="relative overflow-hidden">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(-${currentSlide * 100}%)`,
                  width: `${suggestedGroups.length * 100}%`
                }}
              >
                {suggestedGroups.map((group) => (
                  <Card key={group.id} className="w-full shadow-soft hover:shadow-medium transition-smooth flex-shrink-0">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                            <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white">
                              {group.status}
                            </Badge>
                          </div>
                          <p className="text-muted-foreground mb-3">{group.description}</p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Users className="w-4 h-4" />
                              {group.members} members
                            </div>
                            <Badge variant="outline" className="border-orange-300 text-orange-600">{group.category}</Badge>
                          </div>
                        </div>
                        <Button className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
                          <Plus className="w-4 h-4 mr-2" />
                          Join
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              {/* Slide Indicators */}
              <div className="flex justify-center mt-4 gap-2">
                {suggestedGroups.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all ${
                      index === currentSlide ? "bg-gradient-to-r from-orange-400 to-red-500" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Meet and Greet Activity */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Meet & Greet Activity</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    👋
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Weekly Networking Session</h3>
                    <p className="text-sm text-muted-foreground">Join our community icebreaker every Friday at 6 PM</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded">This Friday</span>
                      <span className="text-xs text-muted-foreground">• 45 members interested</span>
                    </div>
                  </div>
                  <Button size="sm" className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
                    Join Session
                  </Button>
                </div>
                
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white font-bold">
                    🤝
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">New Member Welcome</h3>
                    <p className="text-sm text-muted-foreground">Help newcomers feel welcome in our community</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded">Ongoing</span>
                      <span className="text-xs text-muted-foreground">• 5 new members this week</span>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="border-orange-300 text-orange-600 hover:bg-orange-50">
                    Participate
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

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