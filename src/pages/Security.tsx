import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Shield, Key, Smartphone, AlertTriangle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Security = () => {
  const navigate = useNavigate();

  return (
    <Layout title="Security">
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Security</h1>
            <p className="text-muted-foreground">Two-factor authentication and security settings</p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Key className="w-5 h-5" />
                  Password & Authentication
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Change Password</h4>
                    <p className="text-sm text-muted-foreground">Last changed 3 months ago</p>
                  </div>
                  <Button variant="outline">Change</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Two-Factor Authentication</h4>
                    <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-red-600">Not enabled</span>
                    <Button variant="default">Enable</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Device Management
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Current Device - Chrome on Windows</h4>
                      <p className="text-sm text-muted-foreground">Last active: Now</p>
                    </div>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">Active</span>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">iPhone 14 Pro</h4>
                      <p className="text-sm text-muted-foreground">Last active: 2 hours ago</p>
                    </div>
                    <Button variant="outline" size="sm">Sign Out</Button>
                  </div>
                </div>
                <Button variant="destructive" size="sm">
                  Sign Out All Devices
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Login Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Login Notifications</h4>
                    <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Suspicious Activity Alerts</h4>
                    <p className="text-sm text-muted-foreground">Alert me of unusual account activity</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft border-red-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600">
                  <AlertTriangle className="w-5 h-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Download Your Data</h4>
                    <p className="text-sm text-muted-foreground">Get a copy of your account data</p>
                  </div>
                  <Button variant="outline">Download</Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Delete Account</h4>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                  </div>
                  <Button variant="destructive">Delete</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Security;