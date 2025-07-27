import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, MapPin, Users } from "lucide-react";

const events = [
  {
    id: 1,
    title: "Community Meetup",
    description: "Join us for an evening of networking and community building",
    date: "July 28",
    time: "10:00 AM",
    location: "Central Park",
    attendees: 45,
    status: "attending",
    category: "Networking"
  },
  {
    id: 2,
    title: "Art Workshop",
    description: "Creative painting session for all skill levels",
    date: "August 14", 
    time: "3:00 PM",
    location: "Creative Studio",
    attendees: 12,
    status: "interested",
    category: "Workshop"
  },
  {
    id: 3,
    title: "Tech Talk: AI Future",
    description: "Discussion on AI trends and their impact",
    date: "August 20",
    time: "6:00 PM", 
    location: "Tech Hub",
    attendees: 78,
    status: "not_attending",
    category: "Technology"
  }
];

const Events = () => {
  return (
    <Layout title="Events">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--events-bg)' }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Events</h1>
            <Button className="bg-gradient-primary text-white">
              Create Event
            </Button>
          </div>

          <div className="grid gap-6">
            {events.map((event) => (
              <Card key={event.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-xl font-semibold text-foreground">{event.title}</h3>
                        <Badge variant="outline">{event.category}</Badge>
                      </div>
                      <p className="text-muted-foreground mb-4">{event.description}</p>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4" />
                          {event.time}
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
                    </div>
                    
                    <div className="flex flex-col gap-2">
                      {event.status === "attending" && (
                        <Badge className="bg-green-100 text-green-800">Attending</Badge>
                      )}
                      {event.status === "interested" && (
                        <Badge className="bg-yellow-100 text-yellow-800">Interested</Badge>
                      )}
                      
                      <Button 
                        variant={event.status === "attending" ? "outline" : "default"}
                        size="sm"
                        className={event.status !== "attending" ? "bg-gradient-primary text-white" : ""}
                      >
                        {event.status === "attending" ? "Cancel" : "Attend"}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Events;