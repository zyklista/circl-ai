import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Eye, Lock, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SettingsPrivacy = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Settings & Privacy">
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings & Privacy</h1>
            <p className="text-muted-foreground">Control your account settings and privacy options</p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">Allow others to see your profile</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Show Activity Status</h4>
                    <p className="text-sm text-muted-foreground">Let others see when you're active</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Contact Information</h4>
                    <p className="text-sm text-muted-foreground">Allow others to find you by email or phone</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="w-5 h-5" />
                  Communication Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Direct Messages</h4>
                    <p className="text-sm text-muted-foreground">Who can send you direct messages</p>
                  </div>
                  <select className="px-3 py-2 border rounded-md bg-background">
                    <option>Everyone</option>
                    <option>Groups only</option>
                    <option>Nobody</option>
                  </select>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Group Invitations</h4>
                    <p className="text-sm text-muted-foreground">Who can invite you to groups</p>
                  </div>
                  <select className="px-3 py-2 border rounded-md bg-background">
                    <option>Everyone</option>
                    <option>Friends only</option>
                    <option>Nobody</option>
                  </select>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Lock className="w-5 h-5" />
                  Data & Analytics
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Analytics Tracking</h4>
                    <p className="text-sm text-muted-foreground">Help us improve by sharing usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Personalized Ads</h4>
                    <p className="text-sm text-muted-foreground">Show relevant ads based on your activity</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPrivacy;