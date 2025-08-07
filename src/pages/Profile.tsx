import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CheckCircle, Edit, MapPin, Link as LinkIcon, Calendar, Users, Camera, X } from "lucide-react";
import { useState } from "react";

const Profile = () => {
  const [coverPhoto, setCoverPhoto] = useState("/api/placeholder/800/300");
  const [profilePhoto, setProfilePhoto] = useState("/api/placeholder/128/128");

  const handleCoverPhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCoverPhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfilePhoto(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <Layout title="Profile">
      <div className="min-h-screen p-6 bg-gradient-to-br from-primary/10 to-accent/10">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile Header */}
          <Card className="shadow-soft overflow-hidden">
            {/* Cover Photo Section */}
            <div className="relative h-48 bg-gradient-to-r from-blue-400 to-purple-500">
              <img 
                src={coverPhoto} 
                alt="Cover" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <label className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full cursor-pointer transition-colors">
                <Camera className="w-4 h-4 text-gray-700" />
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={handleCoverPhotoChange}
                  className="hidden" 
                />
              </label>
            </div>
            
            <CardContent className="p-6 relative">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col items-center md:items-start -mt-16 md:-mt-20">
                  <div className="relative">
                    <Avatar className="w-32 h-32 mb-4 border-4 border-white shadow-lg">
                      <AvatarImage src={profilePhoto} />
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <label className="absolute bottom-4 right-2 bg-white hover:bg-gray-50 p-2 rounded-full cursor-pointer shadow-md transition-colors">
                      <Camera className="w-4 h-4 text-gray-700" />
                      <input 
                        type="file" 
                        accept="image/*" 
                        onChange={handleProfilePhotoChange}
                        className="hidden" 
                      />
                    </label>
                  </div>
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