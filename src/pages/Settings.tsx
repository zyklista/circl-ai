import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Bell, 
  Lock, 
  User, 
  Palette, 
  Globe, 
  Shield, 
  HelpCircle, 
  LogOut,
  Eye,
  EyeOff,
  Camera,
  Edit,
  Trash2,
  Download,
  Upload,
  Crown,
  CreditCard,
  Users,
  MessageSquare,
  Calendar,
  ShoppingCart,
  Phone,
  Mail,
  MapPin,
  Link as LinkIcon,
  Save,
  X
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("profile");
  const [showPassword, setShowPassword] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();

  // Profile state
  const [profile, setProfile] = useState({
    displayName: "Jane Smith",
    username: "janesmith",
    email: "jane@example.com",
    phone: "+1 (555) 123-4567",
    bio: "Creative professional passionate about design and community building.",
    location: "San Francisco, CA",
    website: "https://janesmith.design",
    birthday: "1990-05-15"
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    pushNotifications: true,
    emailNotifications: true,
    groupMessages: true,
    eventReminders: true,
    marketplaceUpdates: false,
    weeklyDigest: true,
    messagePreview: true,
    soundEnabled: true
  });

  // Privacy settings
  const [privacy, setPrivacy] = useState({
    profileVisibility: "members",
    showOnlineStatus: true,
    allowMessages: "everyone",
    showEmail: false,
    showPhone: false,
    allowTagging: true,
    showActivity: true
  });

  // App preferences
  const [preferences, setPreferences] = useState({
    theme: "light",
    language: "en",
    autoplay: true,
    dataUsage: "standard",
    fontSize: "medium"
  });

  const handleSaveProfile = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been saved successfully.",
    });
    setIsEditing(false);
  };

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Settings Updated",
      description: "Notification preferences have been saved.",
    });
  };

  const handlePrivacyChange = (key: string, value: any) => {
    setPrivacy(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Privacy Updated",
      description: "Privacy settings have been saved.",
    });
  };

  const handlePreferenceChange = (key: string, value: any) => {
    setPreferences(prev => ({ ...prev, [key]: value }));
    toast({
      title: "Preferences Updated",
      description: "App preferences have been saved.",
    });
  };

  return (
    <Layout title="Settings">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--community-bg)' }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-6 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="privacy">Privacy</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="help">Help</TabsTrigger>
            </TabsList>

            {/* Profile Settings */}
            <TabsContent value="profile">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card className="shadow-soft">
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setIsEditing(!isEditing)}
                      >
                        {isEditing ? (
                          <>
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </>
                        ) : (
                          <>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </>
                        )}
                      </Button>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Display Name</label>
                          <Input 
                            value={profile.displayName}
                            onChange={(e) => setProfile(prev => ({ ...prev, displayName: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Username</label>
                          <Input 
                            value={profile.username}
                            onChange={(e) => setProfile(prev => ({ ...prev, username: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Email</label>
                          <Input 
                            type="email"
                            value={profile.email}
                            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Phone</label>
                          <Input 
                            value={profile.phone}
                            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Bio</label>
                        <Textarea 
                          value={profile.bio}
                          onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                          disabled={!isEditing}
                          className="min-h-[100px]"
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Location</label>
                          <Input 
                            value={profile.location}
                            onChange={(e) => setProfile(prev => ({ ...prev, location: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-foreground mb-2 block">Website</label>
                          <Input 
                            value={profile.website}
                            onChange={(e) => setProfile(prev => ({ ...prev, website: e.target.value }))}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Birthday</label>
                        <Input 
                          type="date"
                          value={profile.birthday}
                          onChange={(e) => setProfile(prev => ({ ...prev, birthday: e.target.value }))}
                          disabled={!isEditing}
                        />
                      </div>

                      {isEditing && (
                        <div className="flex justify-end gap-2">
                          <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                          </Button>
                          <Button onClick={handleSaveProfile} className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </div>

                {/* Profile Picture */}
                <div>
                  <Card className="shadow-soft">
                    <CardHeader>
                      <CardTitle>Profile Picture</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center space-y-4">
                      <Avatar className="w-32 h-32 mx-auto">
                        <AvatarImage src="/api/placeholder/128/128" />
                        <AvatarFallback>JS</AvatarFallback>
                      </Avatar>
                      <div className="space-y-2">
                        <Button size="sm" className="w-full">
                          <Camera className="w-4 h-4 mr-2" />
                          Change Photo
                        </Button>
                        <Button variant="outline" size="sm" className="w-full">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="w-full text-red-600">
                          <Trash2 className="w-4 h-4 mr-2" />
                          Remove
                        </Button>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Social Links */}
                  <Card className="shadow-soft mt-6">
                    <CardHeader>
                      <CardTitle>Social Links</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">LinkedIn</label>
                        <Input placeholder="LinkedIn profile URL" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Twitter</label>
                        <Input placeholder="Twitter profile URL" />
                      </div>
                      <div>
                        <label className="text-sm font-medium text-foreground mb-1 block">Instagram</label>
                        <Input placeholder="Instagram profile URL" />
                      </div>
                      <Button size="sm" className="w-full" variant="outline">
                        Update Links
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Notifications */}
            <TabsContent value="notifications">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Push Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Enable Push Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive notifications on your device</p>
                      </div>
                      <Switch 
                        checked={notifications.pushNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Group Messages</p>
                        <p className="text-sm text-muted-foreground">Notifications for group messages</p>
                      </div>
                      <Switch 
                        checked={notifications.groupMessages}
                        onCheckedChange={(checked) => handleNotificationChange('groupMessages', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Event Reminders</p>
                        <p className="text-sm text-muted-foreground">Reminders for upcoming events</p>
                      </div>
                      <Switch 
                        checked={notifications.eventReminders}
                        onCheckedChange={(checked) => handleNotificationChange('eventReminders', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Marketplace Updates</p>
                        <p className="text-sm text-muted-foreground">New items and deals</p>
                      </div>
                      <Switch 
                        checked={notifications.marketplaceUpdates}
                        onCheckedChange={(checked) => handleNotificationChange('marketplaceUpdates', checked)}
                      />
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
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Get updates via email</p>
                      </div>
                      <Switch 
                        checked={notifications.emailNotifications}
                        onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Weekly Digest</p>
                        <p className="text-sm text-muted-foreground">Summary of weekly activity</p>
                      </div>
                      <Switch 
                        checked={notifications.weeklyDigest}
                        onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Message Preview</p>
                        <p className="text-sm text-muted-foreground">Show message content in notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.messagePreview}
                        onCheckedChange={(checked) => handleNotificationChange('messagePreview', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Sound Notifications</p>
                        <p className="text-sm text-muted-foreground">Play sound for notifications</p>
                      </div>
                      <Switch 
                        checked={notifications.soundEnabled}
                        onCheckedChange={(checked) => handleNotificationChange('soundEnabled', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Privacy & Security */}
            <TabsContent value="privacy">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy Settings
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Profile Visibility</p>
                        <p className="text-sm text-muted-foreground">Who can see your profile</p>
                      </div>
                      <Select 
                        value={privacy.profileVisibility}
                        onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="members">Members Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Show Online Status</p>
                        <p className="text-sm text-muted-foreground">Let others see when you're online</p>
                      </div>
                      <Switch 
                        checked={privacy.showOnlineStatus}
                        onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Allow Messages</p>
                        <p className="text-sm text-muted-foreground">Who can send you messages</p>
                      </div>
                      <Select 
                        value={privacy.allowMessages}
                        onValueChange={(value) => handlePrivacyChange('allowMessages', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="everyone">Everyone</SelectItem>
                          <SelectItem value="members">Members Only</SelectItem>
                          <SelectItem value="none">No One</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Show Email</p>
                        <p className="text-sm text-muted-foreground">Display email in profile</p>
                      </div>
                      <Switch 
                        checked={privacy.showEmail}
                        onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                      />
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <p className="font-medium text-foreground mb-2">Change Password</p>
                      <div className="space-y-3">
                        <Input type="password" placeholder="Current password" />
                        <Input type="password" placeholder="New password" />
                        <Input type="password" placeholder="Confirm new password" />
                        <Button size="sm" className="bg-gradient-to-br from-orange-400 to-red-500 text-white">
                          Update Password
                        </Button>
                      </div>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Two-Factor Authentication</p>
                        <p className="text-sm text-muted-foreground">Add extra security to your account</p>
                      </div>
                      <Button variant="outline" size="sm">Enable</Button>
                    </div>
                    <Separator />
                    <div>
                      <p className="font-medium text-foreground mb-2">Active Sessions</p>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center p-2 bg-community-hover rounded">
                          <div>
                            <p className="text-sm font-medium">Current Session</p>
                            <p className="text-xs text-muted-foreground">Chrome on MacOS</p>
                          </div>
                          <Badge variant="outline" className="text-green-600 border-green-300">Active</Badge>
                        </div>
                        <Button variant="outline" size="sm" className="w-full">
                          View All Sessions
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* App Preferences */}
            <TabsContent value="preferences">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Palette className="w-5 h-5" />
                      Appearance
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Theme</p>
                        <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
                      </div>
                      <Select 
                        value={preferences.theme}
                        onValueChange={(value) => handlePreferenceChange('theme', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="system">System</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Font Size</p>
                        <p className="text-sm text-muted-foreground">Adjust text size</p>
                      </div>
                      <Select 
                        value={preferences.fontSize}
                        onValueChange={(value) => handlePreferenceChange('fontSize', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="small">Small</SelectItem>
                          <SelectItem value="medium">Medium</SelectItem>
                          <SelectItem value="large">Large</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Globe className="w-5 h-5" />
                      General Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Language</p>
                        <p className="text-sm text-muted-foreground">Select your language</p>
                      </div>
                      <Select 
                        value={preferences.language}
                        onValueChange={(value) => handlePreferenceChange('language', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                          <SelectItem value="de">German</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Auto-play Videos</p>
                        <p className="text-sm text-muted-foreground">Automatically play videos in feed</p>
                      </div>
                      <Switch 
                        checked={preferences.autoplay}
                        onCheckedChange={(checked) => handlePreferenceChange('autoplay', checked)}
                      />
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Data Usage</p>
                        <p className="text-sm text-muted-foreground">Control data consumption</p>
                      </div>
                      <Select 
                        value={preferences.dataUsage}
                        onValueChange={(value) => handlePreferenceChange('dataUsage', value)}
                      >
                        <SelectTrigger className="w-32">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="low">Low</SelectItem>
                          <SelectItem value="standard">Standard</SelectItem>
                          <SelectItem value="high">High</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Account Management */}
            <TabsContent value="account">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="w-5 h-5" />
                      Membership
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg">
                      <Badge className="bg-gradient-to-r from-orange-400 to-red-500 text-white mb-2">
                        Free Plan
                      </Badge>
                      <p className="text-sm text-muted-foreground">You're currently on the Free plan</p>
                    </div>
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Current benefits:</p>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Join up to 2 groups</li>
                        <li>• Basic messaging</li>
                        <li>• Standard support</li>
                      </ul>
                    </div>
                    <Button className="w-full bg-gradient-to-br from-orange-400 to-red-500 text-white">
                      <Crown className="w-4 h-4 mr-2" />
                      Upgrade to Premium
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Data & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download Your Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Upload className="w-4 h-4 mr-2" />
                      Import Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Report
                    </Button>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium text-red-600">Danger Zone</p>
                      <Button variant="outline" className="w-full justify-start text-red-600 border-red-300 hover:bg-red-50">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete Account
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Help & Support */}
            <TabsContent value="help">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      Support & Help
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Button variant="outline" className="w-full justify-start">
                      <HelpCircle className="w-4 h-4 mr-2" />
                      Help Center
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <MessageSquare className="w-4 h-4 mr-2" />
                      Contact Support
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Users className="w-4 h-4 mr-2" />
                      Community Guidelines
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Policy
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Globe className="w-4 h-4 mr-2" />
                      Terms of Service
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>App Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Version</span>
                        <span className="text-sm font-medium">2.1.0</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Last Updated</span>
                        <span className="text-sm font-medium">Dec 15, 2024</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Platform</span>
                        <span className="text-sm font-medium">Web</span>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-center">
                      <Button variant="outline" size="sm">
                        Check for Updates
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Sign Out */}
              <Card className="shadow-soft mt-6">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium text-foreground">Sign Out</p>
                      <p className="text-sm text-muted-foreground">Sign out from your account on this device</p>
                    </div>
                    <Button variant="outline" className="text-red-600 border-red-600 hover:bg-red-50">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;