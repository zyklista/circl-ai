import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  Calendar, 
  Clock, 
  MapPin, 
  Users, 
  CreditCard,
  Shield,
  CheckCircle,
  AlertCircle,
  ArrowLeft,
  Phone,
  Mail,
  User
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Sample event data for join page
const eventData = {
  id: 1,
  title: "Creative Design Workshop 2024",
  description: "Join us for an immersive workshop exploring the latest trends in digital design, user experience, and creative problem-solving.",
  date: "December 15, 2024",
  time: "2:00 PM - 6:00 PM",
  location: "Creative Hub, Downtown",
  price: "Free",
  organizer: {
    name: "Creative Minds Community",
    avatar: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop",
    verified: true
  },
  attendees: 234,
  maxAttendees: 300,
  requirements: [
    "Please bring your laptop",
    "No prior design experience required",
    "Arrive 15 minutes early for check-in"
  ],
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop"
};

const JoinEvent = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    company: "",
    experience: "",
    dietaryRestrictions: "",
    agreeToTerms: false,
    emailUpdates: true
  });
  const [isJoining, setIsJoining] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleJoinEvent = async () => {
    if (!formData.fullName || !formData.email || !formData.agreeToTerms) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields and agree to the terms.",
        variant: "destructive"
      });
      return;
    }

    setIsJoining(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsJoining(false);
      toast({
        title: "Successfully Joined!",
        description: "You've been registered for the event. Check your email for details.",
      });
      navigate(`/events/${id}`);
    }, 2000);
  };

  return (
    <Layout title="">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--events-bg)' }}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button 
              variant="outline" 
              size="icon"
              onClick={() => navigate(`/events/${id}`)}
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-3xl font-bold">Join Event</h1>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Event Summary */}
            <div className="lg:col-span-1">
              <Card className="shadow-soft sticky top-6">
                <div className="relative">
                  <img 
                    src={eventData.image} 
                    alt={eventData.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <Badge className="absolute top-3 right-3 bg-events-primary text-white">
                    📅 Upcoming
                  </Badge>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-3">{eventData.title}</h3>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-events-primary" />
                      <span className="font-medium">{eventData.date}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-events-primary" />
                      <span>{eventData.time}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-events-primary" />
                      <span>{eventData.location}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-events-primary" />
                      <span>{eventData.attendees}/{eventData.maxAttendees} attending</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 mb-6">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={eventData.organizer.avatar} />
                      <AvatarFallback>CM</AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{eventData.organizer.name}</span>
                        {eventData.organizer.verified && (
                          <CheckCircle className="w-4 h-4 text-events-primary" />
                        )}
                      </div>
                      <span className="text-sm text-muted-foreground">Event Organizer</span>
                    </div>
                  </div>

                  <div className="text-center p-4 bg-events-secondary/20 rounded-lg">
                    <div className="text-2xl font-bold text-events-primary">{eventData.price}</div>
                    <div className="text-sm text-muted-foreground">Registration Fee</div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Registration Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5 text-events-primary" />
                    Registration Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Personal Information</h4>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName">Full Name *</Label>
                        <Input
                          id="fullName"
                          value={formData.fullName}
                          onChange={(e) => handleInputChange("fullName", e.target.value)}
                          placeholder="Enter your full name"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          placeholder="your.email@example.com"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input
                          id="phone"
                          value={formData.phone}
                          onChange={(e) => handleInputChange("phone", e.target.value)}
                          placeholder="+1 (555) 123-4567"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="company">Company/Organization</Label>
                        <Input
                          id="company"
                          value={formData.company}
                          onChange={(e) => handleInputChange("company", e.target.value)}
                          placeholder="Your company name"
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Additional Information</h4>
                    
                    <div>
                      <Label htmlFor="experience">Design Experience Level</Label>
                      <Textarea
                        id="experience"
                        value={formData.experience}
                        onChange={(e) => handleInputChange("experience", e.target.value)}
                        placeholder="Tell us about your design background and what you hope to learn..."
                        className="mt-1 min-h-[100px]"
                      />
                    </div>

                    <div>
                      <Label htmlFor="dietary">Dietary Restrictions/Allergies</Label>
                      <Input
                        id="dietary"
                        value={formData.dietaryRestrictions}
                        onChange={(e) => handleInputChange("dietaryRestrictions", e.target.value)}
                        placeholder="Any dietary restrictions we should know about?"
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <Separator />

                  {/* Event Requirements */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Event Requirements</h4>
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="flex items-start gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                        <span className="font-medium text-blue-900">Please note:</span>
                      </div>
                      <ul className="space-y-1 text-sm text-blue-800">
                        {eventData.requirements.map((req, index) => (
                          <li key={index}>• {req}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <Separator />

                  {/* Terms and Preferences */}
                  <div className="space-y-4">
                    <h4 className="font-semibold text-lg">Terms & Preferences</h4>
                    
                    <div className="space-y-3">
                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="terms"
                          checked={formData.agreeToTerms}
                          onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
                        />
                        <Label htmlFor="terms" className="text-sm leading-relaxed">
                          I agree to the <span className="text-events-primary underline cursor-pointer">Terms of Service</span> and <span className="text-events-primary underline cursor-pointer">Privacy Policy</span>. I understand that this registration is binding and I will attend the event. *
                        </Label>
                      </div>

                      <div className="flex items-start space-x-2">
                        <Checkbox
                          id="updates"
                          checked={formData.emailUpdates}
                          onCheckedChange={(checked) => handleInputChange("emailUpdates", checked as boolean)}
                        />
                        <Label htmlFor="updates" className="text-sm">
                          I'd like to receive email updates about future events and community news
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Submit */}
                  <div className="pt-6">
                    <Button 
                      onClick={handleJoinEvent}
                      disabled={isJoining}
                      className="w-full bg-events-primary text-white hover:bg-events-primary/90 h-12"
                    >
                      {isJoining ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Registering...
                        </div>
                      ) : (
                        <div className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5" />
                          Complete Registration
                        </div>
                      )}
                    </Button>
                    
                    <div className="flex items-center justify-center gap-2 mt-4 text-sm text-muted-foreground">
                      <Shield className="w-4 h-4" />
                      Your information is secure and will not be shared
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default JoinEvent;