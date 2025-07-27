import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Search, Crown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const members = [
  {
    id: 2,
    name: "Mike Chen",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=50&h=50&fit=crop",
    role: "Moderator",
    joinedDate: "Feb 2023",
    posts: 45,
    reputation: "High"
  },
  {
    id: 3,
    name: "Emily Davis",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=50&h=50&fit=crop",
    role: "Member",
    joinedDate: "Mar 2023",
    posts: 32,
    reputation: "High"
  },
  {
    id: 4,
    name: "David Wilson",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=50&h=50&fit=crop",
    role: "Member",
    joinedDate: "Apr 2023",
    posts: 28,
    reputation: "Medium"
  }
];

export default function AssignAdmin() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredMembers = members.filter(member =>
    member.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAssignAdmin = (memberId: number, memberName: string) => {
    toast({
      title: "Admin Assigned",
      description: `${memberName} has been assigned as group admin.`,
    });
    navigate(`/groups/${id}`);
  };

  return (
    <Layout title="Assign Admin">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/groups/${id}`)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Assign Admin</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Select New Admin</CardTitle>
            <p className="text-muted-foreground">
              Choose a trusted member to become a group administrator. Admins can manage the group settings, moderate content, and manage members.
            </p>
            <div className="relative">
              <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-accent/50 transition-colors">
                  <div className="flex items-center gap-4">
                    <Avatar className="w-12 h-12">
                      <AvatarImage src={member.avatar} />
                      <AvatarFallback>{member.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{member.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>Joined {member.joinedDate}</span>
                        <span>•</span>
                        <span>{member.posts} posts</span>
                        <span>•</span>
                        <Badge variant={member.reputation === "High" ? "default" : "secondary"} className="text-xs">
                          {member.reputation} Rep
                        </Badge>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Badge variant={member.role === "Moderator" ? "secondary" : "outline"}>
                      {member.role}
                    </Badge>
                    
                    <Button 
                      onClick={() => handleAssignAdmin(member.id, member.name)}
                      className="bg-gradient-to-br from-orange-400 to-red-500 text-white"
                    >
                      <Crown className="w-4 h-4 mr-2" />
                      Assign as Admin
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}