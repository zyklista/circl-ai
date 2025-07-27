import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowLeft, Upload, Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function EditGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  
  const [groupName, setGroupName] = useState("Creative Minds");
  const [description, setDescription] = useState("A vibrant community of designers, artists, and creative professionals sharing inspiration, tips, and collaborative opportunities.");
  const [guidelines, setGuidelines] = useState("Be respectful and supportive of fellow community members");

  const handleSave = () => {
    toast({
      title: "Group Updated",
      description: "Your group settings have been saved successfully.",
    });
    navigate(`/groups/${id}`);
  };

  return (
    <Layout title="Edit Group">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/groups/${id}`)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Edit Group</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Group Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Group Avatar */}
            <div className="flex items-center gap-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=100&h=100&fit=crop" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <Button variant="outline">
                <Upload className="w-4 h-4 mr-2" />
                Change Avatar
              </Button>
            </div>

            {/* Group Name */}
            <div className="space-y-2">
              <Label htmlFor="groupName">Group Name</Label>
              <Input
                id="groupName"
                value={groupName}
                onChange={(e) => setGroupName(e.target.value)}
              />
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
              />
            </div>

            {/* Community Guidelines */}
            <div className="space-y-2">
              <Label htmlFor="guidelines">Community Guidelines</Label>
              <Textarea
                id="guidelines"
                value={guidelines}
                onChange={(e) => setGuidelines(e.target.value)}
                rows={3}
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate(`/groups/${id}`)}>
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}