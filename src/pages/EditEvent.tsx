import { useState, useEffect } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  Save,
  Trash2,
  Calendar,
  Clock,
  MapPin,
  Users,
  Upload,
  Plus,
  Tag
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

// Sample existing event data for editing
const existingEventData = {
  id: 1,
  title: "Creative Design Workshop 2024",
  description: "Join us for an immersive workshop exploring the latest trends in digital design, user experience, and creative problem-solving.",
  category: "Design",
  date: "2024-12-15",
  startTime: "14:00",
  endTime: "18:00",
  location: "Creative Hub, Downtown",
  address: "123 Design Street, Creative District",
  isOnline: false,
  meetingLink: "",
  maxAttendees: "300",
  price: "",
  currency: "USD",
  isFree: true,
  isPublic: true,
  requiresApproval: false,
  tags: ["Design", "Workshop", "UX/UI"],
  requirements: ["Bring your laptop", "No prior experience required"],
  agenda: [
    { time: "14:00", activity: "Welcome & Introductions" },
    { time: "14:30", activity: "Design Principles Overview" },
    { time: "16:00", activity: "Hands-on Workshop" },
    { time: "17:30", activity: "Q&A and Networking" }
  ],
  contactEmail: "hello@creativeminds.com",
  contactPhone: "+1 (555) 123-4567",
  coverImage: null
};

const EditEvent = () => {
  const [activeTab, setActiveTab] = useState("basic");
  const [eventData, setEventData] = useState(existingEventData);
  const [newTag, setNewTag] = useState("");
  const [newRequirement, setNewRequirement] = useState("");
  const [newAgendaItem, setNewAgendaItem] = useState({ time: "", activity: "" });
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleInputChange = (field: string, value: any) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  const addTag = () => {
    if (newTag.trim() && !eventData.tags.includes(newTag.trim())) {
      setEventData(prev => ({ ...prev, tags: [...prev.tags, newTag.trim()] }));
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setEventData(prev => ({ 
      ...prev, 
      tags: prev.tags.filter(tag => tag !== tagToRemove) 
    }));
  };

  const addRequirement = () => {
    if (newRequirement.trim() && !eventData.requirements.includes(newRequirement.trim())) {
      setEventData(prev => ({ 
        ...prev, 
        requirements: [...prev.requirements, newRequirement.trim()] 
      }));
      setNewRequirement("");
    }
  };

  const removeRequirement = (reqToRemove: string) => {
    setEventData(prev => ({ 
      ...prev, 
      requirements: prev.requirements.filter(req => req !== reqToRemove) 
    }));
  };

  const addAgendaItem = () => {
    if (newAgendaItem.time && newAgendaItem.activity) {
      setEventData(prev => ({ 
        ...prev, 
        agenda: [...prev.agenda, { ...newAgendaItem }] 
      }));
      setNewAgendaItem({ time: "", activity: "" });
    }
  };

  const removeAgendaItem = (index: number) => {
    setEventData(prev => ({ 
      ...prev, 
      agenda: prev.agenda.filter((_, i) => i !== index) 
    }));
  };

  const handleSaveChanges = async () => {
    setIsSaving(true);
    setTimeout(() => {
      setIsSaving(false);
      toast({
        title: "Event Updated",
        description: "Your event has been successfully updated.",
      });
      navigate(`/events/${id}`);
    }, 1500);
  };

  const handleDeleteEvent = async () => {
    setIsDeleting(true);
    setTimeout(() => {
      setIsDeleting(false);
      toast({
        title: "Event Deleted",
        description: "Your event has been deleted successfully.",
      });
      navigate("/events");
    }, 1500);
  };

  const categories = [
    "Technology", "Design", "Business", "Health & Wellness", "Education",
    "Arts & Culture", "Food & Drink", "Sports & Fitness", "Networking",
    "Workshop", "Conference", "Social", "Music", "Other"
  ];

  return (
    <Layout title="">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--events-bg)' }}
      >
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => navigate(`/events/${id}`)}
              >
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <h1 className="text-3xl font-bold">Edit Event</h1>
            </div>
            
            <div className="flex gap-3">
              <Button 
                variant="outline"
                onClick={handleDeleteEvent}
                disabled={isDeleting}
                className="text-red-600 border-red-200 hover:bg-red-50"
              >
                {isDeleting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-red-400 border-t-transparent rounded-full animate-spin"></div>
                    Deleting...
                  </div>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4 mr-2" />
                    Delete Event
                  </>
                )}
              </Button>
              <Button 
                onClick={handleSaveChanges}
                disabled={isSaving}
                className="bg-events-primary text-white hover:bg-events-primary/90"
              >
                {isSaving ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    Saving...
                  </div>
                ) : (
                  <>
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                  </>
                )}
              </Button>
            </div>
          </div>

          {/* Form Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="details">Details</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
              <TabsTrigger value="agenda">Agenda</TabsTrigger>
            </TabsList>

            {/* Basic Information */}
            <TabsContent value="basic" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="title">Event Title *</Label>
                    <Input
                      id="title"
                      value={eventData.title}
                      onChange={(e) => handleInputChange("title", e.target.value)}
                      placeholder="Enter a compelling event title"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Event Description *</Label>
                    <Textarea
                      id="description"
                      value={eventData.description}
                      onChange={(e) => handleInputChange("description", e.target.value)}
                      placeholder="Describe what attendees can expect from your event..."
                      className="mt-1 min-h-[120px]"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="category">Category *</Label>
                      <Select value={eventData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="mt-1">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="coverImage">Cover Image</Label>
                      <div className="mt-1">
                        <input
                          type="file"
                          id="coverImage"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleInputChange("coverImage", file);
                          }}
                          className="hidden"
                        />
                        <Button 
                          variant="outline" 
                          onClick={() => document.getElementById('coverImage')?.click()}
                          className="w-full"
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          {eventData.coverImage ? "Change Cover Image" : "Upload Cover Image"}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div>
                    <Label>Event Tags</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newTag}
                          onChange={(e) => setNewTag(e.target.value)}
                          placeholder="Add a tag"
                          className="flex-1"
                          onKeyPress={(e) => e.key === 'Enter' && addTag()}
                        />
                        <Button onClick={addTag} variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {eventData.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {eventData.tags.map((tag) => (
                            <div 
                              key={tag} 
                              className="flex items-center gap-1 bg-events-secondary/20 text-events-primary px-2 py-1 rounded-md text-sm"
                            >
                              <Tag className="w-3 h-3" />
                              {tag}
                              <button onClick={() => removeTag(tag)} className="ml-1 hover:text-red-500">
                                <Trash2 className="w-3 h-3" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Event Details */}
            <TabsContent value="details" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Date, Time & Location</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <Label htmlFor="date">Event Date *</Label>
                      <Input
                        id="date"
                        type="date"
                        value={eventData.date}
                        onChange={(e) => handleInputChange("date", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="startTime">Start Time *</Label>
                      <Input
                        id="startTime"
                        type="time"
                        value={eventData.startTime}
                        onChange={(e) => handleInputChange("startTime", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="endTime">End Time</Label>
                      <Input
                        id="endTime"
                        type="time"
                        value={eventData.endTime}
                        onChange={(e) => handleInputChange("endTime", e.target.value)}
                        className="mt-1"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={eventData.isOnline}
                        onCheckedChange={(checked) => handleInputChange("isOnline", checked)}
                      />
                      <Label>This is an online event</Label>
                    </div>

                    {eventData.isOnline ? (
                      <div>
                        <Label htmlFor="meetingLink">Meeting Link</Label>
                        <Input
                          id="meetingLink"
                          value={eventData.meetingLink}
                          onChange={(e) => handleInputChange("meetingLink", e.target.value)}
                          placeholder="https://zoom.us/j/..."
                          className="mt-1"
                        />
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="location">Venue Name</Label>
                          <Input
                            id="location"
                            value={eventData.location}
                            onChange={(e) => handleInputChange("location", e.target.value)}
                            placeholder="e.g., Creative Hub, Conference Center"
                            className="mt-1"
                          />
                        </div>
                        <div>
                          <Label htmlFor="address">Full Address</Label>
                          <Input
                            id="address"
                            value={eventData.address}
                            onChange={(e) => handleInputChange("address", e.target.value)}
                            placeholder="123 Main St, City, State 12345"
                            className="mt-1"
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Capacity & Requirements</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="maxAttendees">Maximum Attendees</Label>
                    <Input
                      id="maxAttendees"
                      type="number"
                      value={eventData.maxAttendees}
                      onChange={(e) => handleInputChange("maxAttendees", e.target.value)}
                      placeholder="50"
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label>Event Requirements</Label>
                    <div className="mt-2 space-y-3">
                      <div className="flex gap-2">
                        <Input
                          value={newRequirement}
                          onChange={(e) => setNewRequirement(e.target.value)}
                          placeholder="e.g., Bring your laptop"
                          className="flex-1"
                          onKeyPress={(e) => e.key === 'Enter' && addRequirement()}
                        />
                        <Button onClick={addRequirement} variant="outline">
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      {eventData.requirements.length > 0 && (
                        <div className="space-y-2">
                          {eventData.requirements.map((req, index) => (
                            <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                              <span className="text-sm">{req}</span>
                              <button 
                                onClick={() => removeRequirement(req)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Settings */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Privacy & Registration Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Event Visibility</Label>
                        <p className="text-sm text-muted-foreground">
                          {eventData.isPublic ? "Anyone can find and join this event" : "Only people with the link can join"}
                        </p>
                      </div>
                      <Switch
                        checked={eventData.isPublic}
                        onCheckedChange={(checked) => handleInputChange("isPublic", checked)}
                      />
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Require Approval</Label>
                        <p className="text-sm text-muted-foreground">
                          Manually approve each registration request
                        </p>
                      </div>
                      <Switch
                        checked={eventData.requiresApproval}
                        onCheckedChange={(checked) => handleInputChange("requiresApproval", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <Label htmlFor="contactEmail">Contact Email</Label>
                    <Input
                      id="contactEmail"
                      type="email"
                      value={eventData.contactEmail}
                      onChange={(e) => handleInputChange("contactEmail", e.target.value)}
                      placeholder="your.email@example.com"
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="contactPhone">Contact Phone</Label>
                    <Input
                      id="contactPhone"
                      value={eventData.contactPhone}
                      onChange={(e) => handleInputChange("contactPhone", e.target.value)}
                      placeholder="+1 (555) 123-4567"
                      className="mt-1"
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Agenda */}
            <TabsContent value="agenda" className="space-y-6">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle>Event Agenda</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Input
                        type="time"
                        value={newAgendaItem.time}
                        onChange={(e) => setNewAgendaItem(prev => ({ ...prev, time: e.target.value }))}
                        placeholder="Time"
                      />
                      <Input
                        value={newAgendaItem.activity}
                        onChange={(e) => setNewAgendaItem(prev => ({ ...prev, activity: e.target.value }))}
                        placeholder="Activity description"
                        className="md:col-span-2"
                      />
                    </div>
                    <Button onClick={addAgendaItem} variant="outline" className="w-full">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Agenda Item
                    </Button>
                  </div>

                  {eventData.agenda.length > 0 && (
                    <div className="space-y-2">
                      <h4 className="font-medium">Agenda Items</h4>
                      {eventData.agenda.map((item, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                          <div>
                            <span className="font-medium text-events-primary">{item.time}</span>
                            <span className="ml-3">{item.activity}</span>
                          </div>
                          <button 
                            onClick={() => removeAgendaItem(index)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default EditEvent;