import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, AlertTriangle, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function DeleteGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();
  const [confirmText, setConfirmText] = useState("");
  const groupName = "Creative Minds";

  const handleDeleteGroup = () => {
    if (confirmText === groupName) {
      toast({
        title: "Group Deleted",
        description: "The group has been permanently deleted.",
      });
      navigate("/groups");
    } else {
      toast({
        title: "Confirmation Failed",
        description: "Please type the group name exactly as shown.",
        variant: "destructive",
      });
    }
  };

  return (
    <Layout title="Delete Group">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/groups/${id}`)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Delete Group</h1>
        </div>

        <Card className="border-red-200">
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-red-600">Permanently Delete "{groupName}"?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <h3 className="font-medium text-red-800 mb-2">⚠️ This action cannot be undone!</h3>
              <p className="text-sm text-red-700">
                Deleting this group will permanently remove all content, member data, and history. 
                This action is irreversible.
              </p>
            </div>

            <div className="space-y-4">
              <p className="text-muted-foreground">
                The following will be permanently deleted:
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  All posts, comments, and discussions (1,247 posts)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  All member data and relationships (1,284 members)
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  All uploaded files, images, and media
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Group settings, rules, and configuration
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  All event history and future events
                </li>
              </ul>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmText">
                To confirm deletion, type the group name: <strong>{groupName}</strong>
              </Label>
              <Input
                id="confirmText"
                value={confirmText}
                onChange={(e) => setConfirmText(e.target.value)}
                placeholder="Type group name here..."
                className="border-red-200 focus:border-red-400"
              />
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate(`/groups/${id}`)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleDeleteGroup}
                disabled={confirmText !== groupName}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Group Permanently
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}