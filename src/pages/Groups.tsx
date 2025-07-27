import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, MapPin, Eye, Plus } from "lucide-react";

const groups = [
  {
    id: 1,
    name: "Creative Minds",
    description: "Design & creativity enthusiasts",
    members: 128,
    category: "Design",
    isJoined: true,
    status: "Open"
  },
  {
    id: 2,
    name: "Tech Innovators",
    description: "Latest tech trends and discussions",
    members: 256,
    category: "Technology",
    isJoined: false,
    status: "Open"
  },
  {
    id: 3,
    name: "Local Entrepreneurs", 
    description: "Business networking in your area",
    members: 89,
    category: "Business",
    isJoined: true,
    status: "Private"
  }
];

const Groups = () => {
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
            <h2 className="text-xl font-semibold text-foreground">Joined Groups</h2>
            {groups.filter(group => group.isJoined).map((group) => (
              <Card key={group.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                        <Badge variant={group.status === "Open" ? "default" : "secondary"}>
                          {group.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {group.members} members
                        </div>
                        <Badge variant="outline">{group.category}</Badge>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}

            <h2 className="text-xl font-semibold text-foreground mt-8">Suggested Groups</h2>
            {groups.filter(group => !group.isJoined).map((group) => (
              <Card key={group.id} className="shadow-soft hover:shadow-medium transition-smooth">
                <CardContent className="p-6">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{group.name}</h3>
                        <Badge variant={group.status === "Open" ? "default" : "secondary"}>
                          {group.status}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-3">{group.description}</p>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {group.members} members
                        </div>
                        <Badge variant="outline">{group.category}</Badge>
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

          {/* Create Group - Center Button */}
          <div className="flex justify-center py-8">
            <Card className="shadow-lg border-2 border-dashed border-orange-300 bg-gradient-to-r from-orange-50 to-red-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-full flex items-center justify-center text-white mx-auto mb-4">
                  <Plus className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">Start Your Own Community</h3>
                <p className="text-muted-foreground mb-4">Create a group and bring people together around shared interests</p>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <span className="text-sm bg-amber-100 text-amber-800 px-3 py-1 rounded-full">Premium Feature</span>
                </div>
                <Button className="bg-gradient-to-br from-orange-400 to-red-500 text-white hover:shadow-lg">
                  Create Your Group
                </Button>
                <p className="text-xs text-muted-foreground mt-2">Available for Premium & VIP members</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Groups;