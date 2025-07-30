import { useState } from "react";
import { Users, Crown, Calendar, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

// Mock data for joined groups
const joinedGroups = [
  {
    id: 1,
    name: "Creative Minds",
    description: "A community for creative professionals",
    members: 125,
    isAdmin: true,
    lastActivity: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?w=100&h=100&fit=crop&crop=face"
  },
  {
    id: 2,
    name: "Tech Innovators",
    description: "Latest tech trends and discussions",
    members: 256,
    isAdmin: false,
    lastActivity: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=100&h=100&fit=crop"
  },
  {
    id: 3,
    name: "Local Entrepreneurs",
    description: "Business networking in your area",
    members: 89,
    isAdmin: false,
    lastActivity: "3 days ago",
    avatar: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=100&h=100&fit=crop"
  }
];

export function JoinedGroups() {
  const navigate = useNavigate();

  return (
    <Card className="bg-white dark:bg-slate-800 shadow-lg border-0">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="w-5 h-5 text-primary" />
          My Groups
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        {joinedGroups.map((group) => (
          <div
            key={group.id}
            className="flex items-center gap-3 p-3 hover:bg-muted/50 rounded-lg transition-colors cursor-pointer"
            onClick={() => navigate(`/groups/${group.id}`)}
          >
            <div className="relative">
              <img
                src={group.avatar}
                alt={group.name}
                className="w-12 h-12 rounded-full object-cover"
              />
              {group.isAdmin && (
                <Badge className="absolute -top-1 -right-1 bg-yellow-500 text-white p-1 rounded-full">
                  <Crown className="w-2 h-2" />
                </Badge>
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-foreground truncate">{group.name}</h4>
              <p className="text-xs text-muted-foreground truncate">{group.description}</p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-xs text-muted-foreground flex items-center gap-1">
                  <Users className="w-3 h-3" />
                  {group.members}
                </span>
                <span className="text-xs text-muted-foreground">{group.lastActivity}</span>
              </div>
            </div>
          </div>
        ))}
        
        <Button
          variant="outline"
          className="w-full mt-4"
          onClick={() => navigate('/groups')}
        >
          View All Groups
        </Button>
      </CardContent>
    </Card>
  );
}