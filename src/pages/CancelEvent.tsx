import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { 
  ArrowLeft,
  Calendar,
  Clock,
  MapPin,
  Users,
  AlertTriangle,
  Heart,
  Frown,
  CheckCircle
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const eventData = {
  id: 1,
  title: "Creative Design Workshop 2024",
  date: "December 15, 2024",
  time: "2:00 PM - 6:00 PM",
  location: "Creative Hub, Downtown",
  image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=300&fit=crop"
};

const CancelEvent = () => {
  const [reason, setReason] = useState("");
  const [feedback, setFeedback] = useState("");
  const [wouldRecommend, setWouldRecommend] = useState(false);
  const [futureUpdates, setFutureUpdates] = useState(true);
  const [isCanceling, setIsCanceling] = useState(false);
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();

  const cancelReasons = [
    "Schedule conflict",
    "No longer interested",
    "Found another event",
    "Personal reasons",
    "Event details changed",
    "Cost concerns",
    "Other"
  ];

  const handleCancel = async () => {
    if (!reason) {
      toast({
        title: "Reason Required",
        description: "Please select a reason for canceling.",
        variant: "destructive"
      });
      return;
    }

    setIsCanceling(true);
    setTimeout(() => {
      setIsCanceling(false);
      toast({
        title: "Attendance Canceled",
        description: "Your attendance has been canceled. We're sorry to see you go!",
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
            <h1 className="text-3xl font-bold">Cancel Attendance</h1>
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
                  <Badge className="absolute top-3 right-3 bg-red-500 text-white">
                    ⚠️ Canceling
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
                  </div>

                  <div className="bg-red-50 p-4 rounded-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="w-5 h-5 text-red-600" />
                      <span className="font-medium text-red-900">Cancellation Policy</span>
                    </div>
                    <p className="text-sm text-red-800">
                      You can cancel your attendance at any time. For paid events, refund policies may apply.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Cancellation Form */}
            <div className="lg:col-span-2">
              <Card className="shadow-soft">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Frown className="w-5 h-5 text-red-500" />
                    We're Sorry to See You Go
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-4">Why are you canceling your attendance?</h4>
                    <div className="grid md:grid-cols-2 gap-3">
                      {cancelReasons.map((reasonOption) => (
                        <div key={reasonOption} className="flex items-center space-x-2">
                          <Checkbox
                            id={reasonOption}
                            checked={reason === reasonOption}
                            onCheckedChange={(checked) => {
                              if (checked) setReason(reasonOption);
                            }}
                          />
                          <label htmlFor={reasonOption} className="text-sm cursor-pointer">
                            {reasonOption}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-2">Additional Feedback (Optional)</h4>
                    <Textarea
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                      placeholder="Help us improve by sharing more details about your cancellation..."
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="recommend"
                        checked={wouldRecommend}
                        onCheckedChange={(checked) => setWouldRecommend(checked as boolean)}
                      />
                      <label htmlFor="recommend" className="text-sm">
                        I would still recommend this event to others
                      </label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <Checkbox
                        id="updates"
                        checked={futureUpdates}
                        onCheckedChange={(checked) => setFutureUpdates(checked as boolean)}
                      />
                      <label htmlFor="updates" className="text-sm">
                        Keep me updated about similar events in the future
                      </label>
                    </div>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h5 className="font-medium text-blue-900 mb-2">Before you cancel...</h5>
                    <ul className="text-sm text-blue-800 space-y-1">
                      <li>• Consider reaching out to the organizer if you have concerns</li>
                      <li>• Check if you can transfer your spot to a friend</li>
                      <li>• Look for similar events you might be interested in</li>
                    </ul>
                  </div>

                  <div className="flex gap-3 pt-6">
                    <Button 
                      variant="outline"
                      onClick={() => navigate(`/events/${id}`)}
                      className="flex-1"
                    >
                      Keep My Attendance
                    </Button>
                    <Button 
                      onClick={handleCancel}
                      disabled={isCanceling || !reason}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                    >
                      {isCanceling ? (
                        <div className="flex items-center gap-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          Canceling...
                        </div>
                      ) : (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Cancel My Attendance
                        </>
                      )}
                    </Button>
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

export default CancelEvent;