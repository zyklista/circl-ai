import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Bell, Mail, MessageSquare, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Notifications = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Notifications">
      <div className="min-h-screen p-6 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Manage your notification preferences</p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Push Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">New Messages</h4>
                    <p className="text-sm text-muted-foreground">Get notified when you receive new messages</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Group Activity</h4>
                    <p className="text-sm text-muted-foreground">Updates from groups you're part of</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Event Reminders</h4>
                    <p className="text-sm text-muted-foreground">Reminders for upcoming events</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketplace Updates</h4>
                    <p className="text-sm text-muted-foreground">New items and transaction updates</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="w-5 h-5" />
                  Email Notifications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Weekly Digest</h4>
                    <p className="text-sm text-muted-foreground">Summary of activity in your groups</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Important Updates</h4>
                    <p className="text-sm text-muted-foreground">Security alerts and policy changes</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Marketing Emails</h4>
                    <p className="text-sm text-muted-foreground">Tips, features, and community highlights</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Quiet Hours</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Enable Quiet Hours</h4>
                    <p className="text-sm text-muted-foreground">Pause non-urgent notifications during set hours</p>
                  </div>
                  <Switch />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">From</label>
                    <input type="time" className="w-full px-3 py-2 border rounded-md bg-background" defaultValue="22:00" />
                  </div>
                  <div>
                    <label className="text-sm font-medium">To</label>
                    <input type="time" className="w-full px-3 py-2 border rounded-md bg-background" defaultValue="08:00" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Notifications;