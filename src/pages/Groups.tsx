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
            <Button className="bg-gradient-primary text-white">
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
                    <Button className="bg-gradient-primary text-white">
                      <Plus className="w-4 h-4 mr-2" />
                      Join
                    </Button>
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

export default Groups;