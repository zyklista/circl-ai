import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Activity, LogIn, MessageSquare, ShoppingCart, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ActivityLog = () => {
  const navigate = useNavigate();

  const activities = [
    {
      id: 1,
      type: "login",
      icon: LogIn,
      action: "Logged in",
      details: "From Chrome on Windows",
      timestamp: "2 hours ago",
      ip: "192.168.1.1"
    },
    {
      id: 2,
      type: "message",
      icon: MessageSquare,
      action: "Sent message",
      details: "In Tech Enthusiasts group",
      timestamp: "3 hours ago",
      ip: "192.168.1.1"
    },
    {
      id: 3,
      type: "purchase",
      icon: ShoppingCart,
      action: "Made purchase",
      details: "Premium membership upgrade",
      timestamp: "1 day ago",
      ip: "192.168.1.1"
    },
    {
      id: 4,
      type: "group",
      icon: Users,
      action: "Joined group",
      details: "Local Photography Club",
      timestamp: "2 days ago",
      ip: "192.168.1.1"
    },
    {
      id: 5,
      type: "login",
      icon: LogIn,
      action: "Logged in",
      details: "From iPhone Safari",
      timestamp: "3 days ago",
      ip: "10.0.0.1"
    }
  ];

  const getActivityColor = (type: string) => {
    switch (type) {
      case "login": return "text-blue-600 bg-blue-100";
      case "message": return "text-green-600 bg-green-100";
      case "purchase": return "text-purple-600 bg-purple-100";
      case "group": return "text-orange-600 bg-orange-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  return (
    <Layout title="Activity Log">
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
            <h1 className="text-3xl font-bold text-foreground mb-2">Activity Log</h1>
            <p className="text-muted-foreground">Review your recent account activity</p>
          </div>

          <div className="grid gap-6">
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="w-5 h-5" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex items-center gap-4 p-4 border rounded-lg">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getActivityColor(activity.type)}`}>
                        <activity.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium">{activity.action}</h4>
                          <span className="text-sm text-muted-foreground">{activity.timestamp}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">{activity.details}</p>
                        <p className="text-xs text-muted-foreground">IP: {activity.ip}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Download Activity Data</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-sm text-muted-foreground">
                  Request a complete download of your activity data for the past year.
                </p>
                <div className="flex gap-3">
                  <Button variant="outline">Download Last 30 Days</Button>
                  <Button variant="outline">Download Last 90 Days</Button>
                  <Button>Download All Activity</Button>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Activity Filters</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <label className="text-sm font-medium">Activity Type</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>All Activities</option>
                      <option>Login Events</option>
                      <option>Messages</option>
                      <option>Purchases</option>
                      <option>Group Activities</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Date Range</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>Last 7 days</option>
                      <option>Last 30 days</option>
                      <option>Last 90 days</option>
                      <option>All time</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Device</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>All Devices</option>
                      <option>Desktop</option>
                      <option>Mobile</option>
                      <option>Tablet</option>
                    </select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full">Apply Filters</Button>
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

export default ActivityLog;