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
  Calendar, 
  MapPin, 
  Users, 
  Clock, 
  Heart, 
  Share2, 
  MessageCircle,
  Camera,
  Video,
  Star,
  CheckCircle,
  UserPlus,
  Settings,
  Bell,
  Copy,
  ExternalLink,
  ThumbsUp,
  Laugh,
  Angry,
  Frown,
  Send,
  Edit,
  MoreHorizontal
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Sample event data
const eventData = {
  id: 1,
  title: "Creative Design Workshop 2024",
  description: "Join us for an immersive workshop exploring the latest trends in digital design, user experience, and creative problem-solving. Perfect for designers, developers, and creative professionals.",
  coverImage: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=400&fit=crop",
  date: "December 15, 2024",
  time: "2:00 PM - 6:00 PM",
  location: "Creative Hub, Downtown",
  address: "123 Design Street, Creative District",
  organizer: {
    name: "Creative Minds Community",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    verified: true
  },
  attendees: 234,
  maxAttendees: 300,
  price: "Free",
  tags: ["Design", "Workshop", "UX/UI", "Networking"],
  status: "upcoming",
  rating: 4.8,
  reviews: 42
};

const attendees = [
  {
    id: 1,
    name: "Sarah Johnson",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3ac?w=40&h=40&fit=crop",
    role: "UX Designer"
  },
  {
    id: 2,
    name: "Alex Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop",
    role: "Frontend Developer"
  },
  {
    id: 3,
    name: "Maya Patel",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=40&h=40&fit=crop",
    role: "Product Manager"
  }
];

const EventPage = () => {
  const [isAttending, setIsAttending] = useState(false);
  const [activeTab, setActiveTab] = useState("details");
  const [reactions, setReactions] = useState({
    like: 45,
    love: 23,
    laugh: 8,
    angry: 2,
    sad: 1,
    userReaction: null as string | null
  });
  const [comments, setComments] = useState([
    {
      id: 1,
      user: { name: "Alice Johnson", avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b3ac?w=40&h=40&fit=crop" },
      content: "This looks amazing! Can't wait to attend 🎨",
      timestamp: "2 hours ago",
      likes: 12
    },
    {
      id: 2,
      user: { name: "Bob Smith", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=40&h=40&fit=crop" },
      content: "Perfect timing for my design learning journey. Thanks for organizing!",
      timestamp: "4 hours ago",
      likes: 8
    }
  ]);
  const [newComment, setNewComment] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleAttendance = () => {
    setIsAttending(!isAttending);
  };

  const handleReaction = (reactionType: string) => {
    toast({
      title: `${reactionType} reaction added!`,
      description: "Your reaction has been recorded.",
    });
  };

  const handleComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: comments.length + 1,
        user: { name: "You", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" },
        content: newComment,
        timestamp: "Just now",
        likes: 0
      };
      setComments([...comments, comment]);
      setNewComment("");
      toast({
        title: "Comment Added",
        description: "Your comment has been posted!",
      });
    }
  };

  return (
    <Layout title="">
      <div 
        className="min-h-screen"
        style={{ background: 'var(--events-bg)' }}
      >
        {/* Event Cover */}
        <div className="relative">
          <div 
            className="h-80 bg-cover bg-center relative"
            style={{ backgroundImage: `url(${eventData.coverImage})` }}
          >
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Badge className="bg-events-primary text-white">
                  {eventData.status === "live" ? "🔴 Live" : "📅 Upcoming"}
                </Badge>
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm">{eventData.rating} ({eventData.reviews})</span>
                </div>
              </div>
              <h1 className="text-4xl font-bold mb-2">{eventData.title}</h1>
              <div className="flex items-center gap-6 text-white/90">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>{eventData.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5" />
                  <span>{eventData.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  <span>{eventData.location}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Event Info */}
        <div className="bg-community-surface border-b border-border">
          <div className="max-w-6xl mx-auto p-6">
            <div className="flex flex-col lg:flex-row gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-4 mb-4">
                  <Avatar className="w-16 h-16">
                    <AvatarImage src={eventData.organizer.avatar} />
                    <AvatarFallback>CM</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-lg">{eventData.organizer.name}</h3>
                      {eventData.organizer.verified && (
                        <CheckCircle className="w-5 h-5 text-events-primary" />
                      )}
                    </div>
                    <p className="text-muted-foreground">Event Organizer</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mb-4">
                  <Users className="w-5 h-5 text-events-primary" />
                  <span className="font-semibold">{eventData.attendees} attending</span>
                  <span className="text-muted-foreground">• {eventData.maxAttendees - eventData.attendees} spots left</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {eventData.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="bg-events-secondary/20 text-events-primary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="lg:w-80">
                <Card className="shadow-soft">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="text-3xl font-bold text-events-primary mb-2">{eventData.price}</div>
                      <p className="text-muted-foreground">per person</p>
                    </div>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Date:</span>
                        <span className="font-medium">{eventData.date}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Time:</span>
                        <span className="font-medium">{eventData.time}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Location:</span>
                        <span className="font-medium">{eventData.location}</span>
                      </div>
                    </div>

                    <div className="space-y-3">
                      {!isAttending ? (
                        <Button 
                          onClick={() => navigate(`/events/${id}/join`)}
                          className="w-full bg-events-primary hover:bg-events-primary/90 text-white"
                        >
                          <UserPlus className="w-4 h-4 mr-2" />
                          Join Event
                        </Button>
                      ) : (
                        <Button 
                          onClick={handleAttendance}
                          className="w-full bg-green-600 hover:bg-green-700 text-white"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Attending
                        </Button>
                      )}

                      <div className="flex gap-2">
                        <Button variant="outline" size="icon" className="flex-1">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="flex-1"
                          onClick={() => navigate(`/events/${id}/share`)}
                        >
                          <Share2 className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="icon" className="flex-1">
                          <Bell className="w-4 h-4" />
                        </Button>
                        <Button 
                          variant="outline" 
                          size="icon" 
                          className="flex-1"
                          onClick={() => navigate(`/events/${id}/edit`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="max-w-6xl mx-auto p-6">
          {/* Facebook-style Reactions & Comments */}
          <Card className="shadow-soft mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    {reactions.like > 0 && <span className="flex items-center gap-1 text-sm"><ThumbsUp className="w-4 h-4 text-blue-600" /> {reactions.like}</span>}
                    {reactions.love > 0 && <span className="flex items-center gap-1 text-sm"><Heart className="w-4 h-4 text-red-500" /> {reactions.love}</span>}
                    {reactions.laugh > 0 && <span className="flex items-center gap-1 text-sm"><Laugh className="w-4 h-4 text-yellow-500" /> {reactions.laugh}</span>}
                    {reactions.angry > 0 && <span className="flex items-center gap-1 text-sm"><Angry className="w-4 h-4 text-red-600" /> {reactions.angry}</span>}
                    {reactions.sad > 0 && <span className="flex items-center gap-1 text-sm"><Frown className="w-4 h-4 text-gray-500" /> {reactions.sad}</span>}
                  </div>
                  <span className="text-sm text-muted-foreground">{comments.length} comments</span>
                </div>
              </div>

              <Separator className="mb-4" />

              {/* Reaction Buttons */}
              <div className="flex justify-around mb-4">
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleReaction('like')}
                  className={`flex items-center gap-2 ${reactions.userReaction === 'like' ? 'text-blue-600' : ''}`}
                >
                  <ThumbsUp className="w-4 h-4" />
                  Like
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleReaction('love')}
                  className={`flex items-center gap-2 ${reactions.userReaction === 'love' ? 'text-red-500' : ''}`}
                >
                  <Heart className="w-4 h-4" />
                  Love
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => handleReaction('laugh')}
                  className={`flex items-center gap-2 ${reactions.userReaction === 'laugh' ? 'text-yellow-500' : ''}`}
                >
                  <Laugh className="w-4 h-4" />
                  Laugh
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="w-4 h-4" />
                  Comment
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => navigate(`/events/${id}/share`)}
                  className="flex items-center gap-2"
                >
                  <Share2 className="w-4 h-4" />
                  Share
                </Button>
              </div>

              <Separator className="mb-4" />

              {/* Comments Section */}
              <div className="space-y-4">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-3">
                    <Avatar className="w-8 h-8">
                      <AvatarImage src={comment.user.avatar} />
                      <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="bg-gray-100 rounded-lg p-3">
                        <h5 className="font-medium text-sm">{comment.user.name}</h5>
                        <p className="text-sm">{comment.content}</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                        <button className="hover:underline">Like</button>
                        <button className="hover:underline">Reply</button>
                        <span>{comment.timestamp}</span>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Add Comment */}
                <div className="flex gap-3 mt-4">
                  <Avatar className="w-8 h-8">
                    <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop" />
                    <AvatarFallback>You</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 flex gap-2">
                    <Textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Write a comment..."
                      className="min-h-[40px] resize-none"
                    />
                    <Button 
                      onClick={handleComment}
                      size="sm"
                      className="bg-events-primary text-white hover:bg-events-primary/90"
                    >
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="attendees">Attendees</TabsTrigger>
              <TabsTrigger value="photos">Photos</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="details" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>About This Event</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    {eventData.description}
                  </p>
                  
                  <Separator className="my-6" />
                  
                  <div className="space-y-4">
                    <h4 className="font-semibold">What You'll Learn</h4>
                    <ul className="space-y-2 text-muted-foreground">
                      <li>• Modern design principles and trends</li>
                      <li>• User experience best practices</li>
                      <li>• Hands-on design tools and techniques</li>
                      <li>• Networking with industry professionals</li>
                    </ul>
                  </div>

                  <Separator className="my-6" />

                  <div className="space-y-4">
                    <h4 className="font-semibold">Location Details</h4>
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-events-primary mt-1" />
                      <div>
                        <p className="font-medium">{eventData.location}</p>
                        <p className="text-muted-foreground">{eventData.address}</p>
                        <Button variant="outline" size="sm" className="mt-2">
                          <ExternalLink className="w-4 h-4 mr-2" />
                          View on Map
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="attendees" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Who's Attending ({eventData.attendees})</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {attendees.map((attendee) => (
                      <div key={attendee.id} className="flex items-center gap-3 p-3 rounded-lg hover:bg-community-hover transition-colors">
                        <Avatar>
                          <AvatarImage src={attendee.avatar} />
                          <AvatarFallback>{attendee.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h4 className="font-medium">{attendee.name}</h4>
                          <p className="text-sm text-muted-foreground">{attendee.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-events-primary text-events-primary hover:bg-events-primary/10">
                      View All Attendees
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="photos" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Camera className="w-5 h-5" />
                    Event Photos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-gray-200 rounded-lg flex items-center justify-center">
                        <Camera className="w-8 h-8 text-gray-400" />
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 text-center">
                    <Button variant="outline">
                      <Camera className="w-4 h-4 mr-2" />
                      Upload Photos
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="reviews" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    Reviews & Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-events-primary mb-2">{eventData.rating}</div>
                    <div className="flex justify-center gap-1 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star 
                          key={star} 
                          className={`w-5 h-5 ${star <= Math.floor(eventData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} 
                        />
                      ))}
                    </div>
                    <p className="text-muted-foreground">Based on {eventData.reviews} reviews</p>
                  </div>

                  <div className="space-y-4">
                    {[1, 2, 3].map((review) => (
                      <div key={review} className="border-b border-border pb-4 last:border-b-0">
                        <div className="flex items-start gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarImage src={`https://images.unsplash.com/photo-149479010875${review}?w=40&h=40&fit=crop`} />
                            <AvatarFallback>U{review}</AvatarFallback>
                          </Avatar>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h5 className="font-medium">User {review}</h5>
                              <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((star) => (
                                  <Star key={star} className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                ))}
                              </div>
                            </div>
                            <p className="text-muted-foreground text-sm">Great event with excellent speakers and networking opportunities!</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 text-center">
                    <Button variant="outline" className="border-events-primary text-events-primary hover:bg-events-primary/10">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Write a Review
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

export default EventPage;