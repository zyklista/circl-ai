import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  Plus, 
  Search,
  Share2,
  Heart,
  Eye,
  TrendingUp,
  Star,
  UserPlus,
  Filter,
  ChevronRight,
  Zap
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Live advertised events for banner
const liveEvents = [
  {
    id: "live1",
    title: "🎉 Summer Tech Festival 2024",
    description: "Join 5000+ developers for the biggest tech event of the year!",
    timeLeft: "2 days",
    attendees: 4580,
    isLive: true
  },
  {
    id: "live2", 
    title: "🎨 Creative Arts Expo",
    description: "Showcase your artistic talents with fellow creators",
    timeLeft: "5 days",
    attendees: 1200,
    isLive: false
  }
];

// User's created events
const myCreatedEvents = [
  {
    id: 1,
    title: "UI/UX Design Workshop",
    description: "Learn modern design principles and tools",
    date: "Aug 15, 2024",
    time: "2:00 PM",
    location: "Design Studio",
    attendees: 25,
    maxAttendees: 30,
    status: "published",
    category: "Workshop",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop"
  },
  {
    id: 2,
    title: "Photography Meetup",
    description: "Capture the beauty of city landscapes together",
    date: "Aug 22, 2024", 
    time: "9:00 AM",
    location: "Downtown",
    attendees: 12,
    maxAttendees: 20,
    status: "draft",
    category: "Photography",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=300&h=200&fit=crop"
  }
];

// User's joined events
const myJoinedEvents = [
  {
    id: 3,
    title: "Community Yoga Session",
    description: "Start your day with mindfulness and movement",
    date: "Aug 12, 2024",
    time: "7:00 AM", 
    location: "Central Park",
    attendees: 45,
    status: "attending",
    category: "Wellness",
    organizer: {
      name: "Sarah Johnson",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b5c3?w=50&h=50&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=300&h=200&fit=crop"
  },
  {
    id: 4,
    title: "Startup Networking Night",
    description: "Connect with entrepreneurs and investors",
    date: "Aug 18, 2024",
    time: "6:30 PM",
    location: "Innovation Hub",
    attendees: 120,
    status: "interested",
    category: "Networking",
    organizer: {
      name: "Mike Chen",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=300&h=200&fit=crop"
  }
];

// Recommended events
const recommendedEvents = [
  {
    id: 5,
    title: "AI Workshop for Beginners", 
    description: "Get started with artificial intelligence and machine learning",
    date: "Aug 25, 2024",
    time: "10:00 AM",
    location: "Tech Campus",
    attendees: 89,
    category: "Technology",
    rating: 4.8,
    organizer: {
      name: "David Wilson",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=300&h=200&fit=crop",
    price: "Free"
  },
  {
    id: 6,
    title: "Local Food Festival",
    description: "Taste the best cuisine from local restaurants and food trucks",
    date: "Sep 5, 2024", 
    time: "12:00 PM",
    location: "City Square",
    attendees: 340,
    category: "Food & Drink",
    rating: 4.9,
    organizer: {
      name: "Emily Davis",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop"
    },
    image: "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=300&h=200&fit=crop",
    price: "$15"
  }
];

const Events = () => {
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentBannerEvent, setCurrentBannerEvent] = useState(0);

  const handleJoinEvent = (eventId: number) => {
    toast({
      title: "Event Joined!",
      description: "You've successfully joined the event. Check your calendar for details.",
    });
  };

  const handleInterestedEvent = (eventId: number) => {
    toast({
      title: "Marked as Interested",
      description: "We'll notify you with updates about this event.",
    });
  };

  const handleShareEvent = (eventId: number) => {
    toast({
      title: "Event Shared",
      description: "Event link copied to clipboard!",
    });
  };

  const handleInviteFriends = () => {
    toast({
      title: "Invite Sent",
      description: "Invitations have been sent to your friends!",
    });
  };

  return (
    <Layout title="Events">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--events-bg)' }}
      >
        {/* Live Events Banner */}
        <div className="relative overflow-hidden bg-gradient-events text-white mb-6">
          <div className="absolute inset-0 bg-black/20"></div>
          <div className="relative max-w-6xl mx-auto p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 animate-pulse" />
              <span className="text-sm font-medium bg-white/20 px-2 py-1 rounded-full">LIVE EVENTS</span>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {liveEvents.map((event, index) => (
                <div 
                  key={event.id} 
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-4 hover:bg-white/20 transition-all cursor-pointer animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="text-lg font-semibold">{event.title}</h3>
                    {event.isLive && (
                      <Badge className="bg-red-500 text-white animate-pulse">
                        LIVE
                      </Badge>
                    )}
                  </div>
                  <p className="text-white/90 text-sm mb-3">{event.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 text-sm">
                      <span>⏰ {event.timeLeft} left</span>
                      <span>👥 {event.attendees.toLocaleString()} joined</span>
                    </div>
                    <Button variant="secondary" size="sm">
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
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">Events</h1>
            <div className="flex gap-3">
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-events-primary text-white hover:bg-events-primary/90">
                <Plus className="w-4 h-4 mr-2" />
                Create Event
              </Button>
            </div>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          {/* Tabs */}
          <Tabs defaultValue="my-events" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="my-events">My Events</TabsTrigger>
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="invite-friends">Invite Friends</TabsTrigger>
            </TabsList>

            {/* My Events Tab */}
            <TabsContent value="my-events" className="space-y-6">
              {/* Created Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5 text-orange-500" />
                    Events I Created
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {myCreatedEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-md transition-all">
                        <div className="relative">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-40 object-cover"
                          />
                          <Badge 
                            className="absolute top-2 right-2"
                            variant={event.status === "published" ? "default" : "secondary"}
                          >
                            {event.status}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                          
                          <div className="space-y-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {event.attendees}/{event.maxAttendees} attending
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" className="flex-1">
                              Edit
                            </Button>
                            <Button variant="outline" size="sm">
                              <Share2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Joined Events */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    Events I'm Attending
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {myJoinedEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-md transition-all">
                        <div className="relative">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-40 object-cover"
                          />
                          <Badge 
                            className="absolute top-2 right-2"
                            variant={event.status === "attending" ? "default" : "secondary"}
                          >
                            {event.status === "attending" ? "Attending" : "Interested"}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold mb-2">{event.title}</h3>
                          <p className="text-sm text-muted-foreground mb-3">{event.description}</p>
                          
                          <div className="flex items-center gap-2 mb-3">
                            <Avatar className="w-6 h-6">
                              <AvatarImage src={event.organizer.avatar} />
                              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">by {event.organizer.name}</span>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground mb-4">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              variant={event.status === "attending" ? "outline" : "default"} 
                              size="sm" 
                              className="flex-1"
                            >
                              {event.status === "attending" ? "Cancel" : "Attend"}
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleShareEvent(event.id)}>
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

            {/* Recommended Events Tab */}
            <TabsContent value="recommended" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    Recommended for You
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {recommendedEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-all hover-scale">
                        <div className="relative">
                          <img 
                            src={event.image} 
                            alt={event.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-green-100 text-green-800">
                              ⭐ {event.rating}
                            </Badge>
                          </div>
                          <div className="absolute top-2 right-2">
                            <Badge variant="secondary">
                              {event.price}
                            </Badge>
                          </div>
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-semibold mb-2">{event.title}</h3>
                          <p className="text-muted-foreground mb-4">{event.description}</p>
                          
                          <div className="flex items-center gap-2 mb-4">
                            <Avatar className="w-8 h-8">
                              <AvatarImage src={event.organizer.avatar} />
                              <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="text-sm text-muted-foreground">by {event.organizer.name}</span>
                          </div>
                          
                          <div className="space-y-2 text-sm text-muted-foreground mb-6">
                            <div className="flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {event.date} at {event.time}
                            </div>
                            <div className="flex items-center gap-2">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </div>
                            <div className="flex items-center gap-2">
                              <Users className="w-4 h-4" />
                              {event.attendees} attending
                            </div>
                          </div>
                          
                          <div className="flex gap-2">
                            <Button 
                              onClick={() => handleJoinEvent(event.id)}
                              className="flex-1 bg-events-primary text-white hover:bg-events-primary/90"
                            >
                              Join Event
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleInterestedEvent(event.id)}
                            >
                              <Heart className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="outline" 
                              size="icon"
                              onClick={() => handleShareEvent(event.id)}
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
                    Invite Friends to Events
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-events-primary rounded-full flex items-center justify-center mx-auto mb-4">
                      <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Grow the Community</h3>
                    <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                      Invite your friends to join amazing events and build connections together. 
                      The more people join, the better our events become!
                    </p>
                    
                    <div className="space-y-4">
                      <Button 
                        onClick={handleInviteFriends}
                        className="bg-events-primary text-white hover:bg-events-primary/90"
                      >
                        <UserPlus className="w-4 h-4 mr-2" />
                        Invite Friends
                      </Button>
                      
                      <div className="flex items-center gap-4 justify-center">
                        <Button variant="outline" size="sm">
                          Share via Email
                        </Button>
                        <Button variant="outline" size="sm">
                          Share on Social
                        </Button>
                        <Button variant="outline" size="sm">
                          Copy Link
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  {/* Referral Benefits */}
                  <div className="bg-gradient-to-r from-events-secondary/20 to-events-primary/20 p-6 rounded-lg">
                    <h4 className="font-semibold mb-3">🎁 Referral Benefits</h4>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>• Get priority access to exclusive events</li>
                      <li>• Earn community points for each successful referral</li>
                      <li>• Unlock special organizer privileges</li>
                      <li>• Build your network with like-minded people</li>
                    </ul>
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

export default Events;