import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Edit, MapPin, Link as LinkIcon, Calendar, Users } from "lucide-react";

const Profile = () => {

  return (
    <Layout title="Profile">
      <div className="min-h-screen p-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start">
                  <Avatar className="w-32 h-32 mb-4">
                    <AvatarImage src="/api/placeholder/128/128" />
                    <AvatarFallback>JS</AvatarFallback>
                  </Avatar>
                  <Button variant="outline" size="sm">
                    <Edit className="w-4 h-4 mr-2" />
                    Change Photo
                  </Button>
                </div>
                
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-foreground">Jane Smith</h1>
                    <Badge className="bg-green-100 text-green-800 flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" />
                      Verified
                    </Badge>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    Creative professional passionate about design and community building. 
                    Love connecting with like-minded individuals and sharing knowledge.
                  </p>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>San Francisco, CA</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span>Joined March 2024</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>2 Groups</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="w-4 h-4 text-muted-foreground" />
                      <span>portfolio.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Edit Profile */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Edit Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Full Name</label>
                  <Input placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                  <Input placeholder="jane@example.com" type="email" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
                  <Textarea placeholder="Tell us about yourself..." />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                  <Input placeholder="San Francisco, CA" />
                </div>
                <Button className="w-full bg-gradient-primary text-white">
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Social & Group Links */}
            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Social & Group Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Website</label>
                  <Input placeholder="https://yourwebsite.com" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">LinkedIn</label>
                  <Input placeholder="https://linkedin.com/in/yourprofile" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Twitter</label>
                  <Input placeholder="https://twitter.com/yourusername" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Instagram</label>
                  <Input placeholder="https://instagram.com/yourusername" />
                </div>
                <Button className="w-full" variant="outline">
                  Update Links
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Verification Process */}
          <Card className="shadow-soft">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                Verification Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 border rounded-lg bg-green-50">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-medium text-green-800">Email Verified</h3>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
                <div className="text-center p-4 border rounded-lg bg-green-50">
                  <CheckCircle className="w-8 h-8 text-green-500 mx-auto mb-2" />
                  <h3 className="font-medium text-green-800">Phone Verified</h3>
                  <p className="text-sm text-green-600">Completed</p>
                </div>
                <div className="text-center p-4 border rounded-lg bg-yellow-50">
                  <div className="w-8 h-8 bg-yellow-200 rounded-full mx-auto mb-2 flex items-center justify-center">
                    <span className="text-yellow-800 text-sm font-bold">ID</span>
                  </div>
                  <h3 className="font-medium text-yellow-800">ID Verification</h3>
                  <p className="text-sm text-yellow-600">Pending</p>
                  <Button size="sm" className="mt-2" variant="outline">
                    Start Verification
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;