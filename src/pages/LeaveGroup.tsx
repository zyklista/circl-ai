import { useNavigate, useParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertTriangle, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function LeaveGroup() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { toast } = useToast();

  const handleLeaveGroup = () => {
    toast({
      title: "Left Group",
      description: "You have successfully left the group.",
    });
    navigate("/groups");
  };

  return (
    <Layout title="Leave Group">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(`/groups/${id}`)}
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <h1 className="text-2xl font-bold">Leave Group</h1>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 rounded-full">
                <AlertTriangle className="w-6 h-6 text-red-600" />
              </div>
              <CardTitle className="text-red-600">Leave Creative Minds?</CardTitle>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <p className="text-muted-foreground">
                Are you sure you want to leave this group? Here's what will happen:
              </p>
              
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  You will lose access to all group content and discussions
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  Your posts and comments will remain but you won't be able to edit them
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  You'll need to be re-invited or request to join again
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-red-500 mt-1">•</span>
                  You'll stop receiving notifications from this group
                </li>
              </ul>
            </div>

            <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-4 h-4 text-amber-600" />
                <span className="font-medium text-amber-800">Alternative Options</span>
              </div>
              <p className="text-sm text-amber-700">
                Instead of leaving, you could mute notifications or adjust your group settings to reduce activity.
              </p>
            </div>

            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => navigate(`/groups/${id}`)}>
                Cancel
              </Button>
              <Button 
                variant="destructive" 
                onClick={handleLeaveGroup}
              >
                Yes, Leave Group
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}