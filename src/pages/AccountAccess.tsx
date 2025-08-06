import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, KeyRound, Shield, ExternalLink, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AccountAccess = () => {
  const navigate = useNavigate();

  const connectedApps = [
    {
      id: 1,
      name: "Google Calendar",
      description: "Sync events with your Google Calendar",
      permissions: ["Read calendar events", "Create calendar events"],
      lastUsed: "2 hours ago",
      status: "active"
    },
    {
      id: 2,
      name: "Slack",
      description: "Get notifications in your Slack workspace",
      permissions: ["Send messages", "Read user profile"],
      lastUsed: "1 day ago",
      status: "active"
    },
    {
      id: 3,
      name: "Analytics Dashboard",
      description: "Third-party analytics integration",
      permissions: ["Read activity data", "Export reports"],
      lastUsed: "1 week ago",
      status: "inactive"
    }
  ];

  return (
    <Layout title="Account Access">
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Account Access</h1>
            <p className="text-muted-foreground">Manage connected apps and API access</p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <ExternalLink className="w-5 h-5" />
                  Connected Applications
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {connectedApps.map((app) => (
                  <div key={app.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{app.name}</h4>
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            app.status === 'active' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-gray-100 text-gray-600'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">{app.description}</p>
                        <div className="mb-2">
                          <p className="text-xs font-medium text-muted-foreground mb-1">Permissions:</p>
                          <ul className="text-xs text-muted-foreground">
                            {app.permissions.map((permission, index) => (
                              <li key={index}>• {permission}</li>
                            ))}
                          </ul>
                        </div>
                        <p className="text-xs text-muted-foreground">Last used: {app.lastUsed}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Configure
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <KeyRound className="w-5 h-5" />
                  API Access Tokens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">Personal Access Token</h4>
                      <p className="text-sm text-muted-foreground">Created on Jan 15, 2024</p>
                      <p className="text-xs text-muted-foreground font-mono">ghp_***************************</p>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">Regenerate</Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
                <Button>
                  <KeyRound className="w-4 h-4 mr-2" />
                  Generate New Token
                </Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Access Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Allow third-party app access</h4>
                    <p className="text-sm text-muted-foreground">Let external applications access your account data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Require approval for new apps</h4>
                    <p className="text-sm text-muted-foreground">Get notified when new apps request access</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">API rate limiting</h4>
                    <p className="text-sm text-muted-foreground">Limit the number of API requests per hour</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Session Management</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Active API Sessions</h4>
                    <p className="text-sm text-muted-foreground">Currently active API connections</p>
                  </div>
                  <span className="text-sm font-medium">3 active</span>
                </div>
                <Button variant="destructive" size="sm">
                  Revoke All Sessions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AccountAccess;