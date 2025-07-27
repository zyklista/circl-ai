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
  X,
  CheckCircle,
  XCircle,
  Clock,
  Settings as SettingsIcon,
  Receipt,
  History,
  Banknote,
  Wallet
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
    birthday: "1990-05-15",
    verificationStatus: "pending" // pending, verified, rejected
  });

  // Transaction state
  const [transactions, setTransactions] = useState({
    current: [
      { id: 1, type: "sale", item: "Vintage Camera", amount: 245.00, status: "pending", date: "2024-01-20", buyer: "Alex Johnson" },
      { id: 2, type: "purchase", item: "Design Book", amount: 32.50, status: "processing", date: "2024-01-19", seller: "Book Store" }
    ],
    history: [
      { id: 3, type: "sale", item: "Art Print", amount: 85.00, status: "completed", date: "2024-01-15", buyer: "Sarah Wilson" },
      { id: 4, type: "purchase", item: "Laptop Stand", amount: 45.00, status: "completed", date: "2024-01-10", seller: "Tech Store" }
    ]
  });

  // Bank information for sellers
  const [bankInfo, setBankInfo] = useState({
    accountHolder: "Jane Smith",
    bankName: "Chase Bank",
    accountNumber: "****1234",
    routingNumber: "****5678",
    verified: true
  });

  // Payment options for buyers
  const [paymentOptions, setPaymentOptions] = useState({
    cards: [
      { id: 1, type: "Visa", last4: "1234", expiry: "12/26", isDefault: true },
      { id: 2, type: "Mastercard", last4: "5678", expiry: "08/25", isDefault: false }
    ],
    paypal: { connected: true, email: "jane@example.com" },
    applePay: { enabled: true }
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
        style={{ background: 'var(--settings-bg)' }}
      >
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-6">Settings</h1>

          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-5 mb-6">
              <TabsTrigger value="profile">Profile</TabsTrigger>
              <TabsTrigger value="settings">Settings & Privacy</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
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

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Verification Status <span className="text-red-500">*</span>
                        </label>
                        <div className="flex items-center gap-2">
                          {profile.verificationStatus === "verified" && (
                            <>
                              <CheckCircle className="w-5 h-5 text-green-500" />
                              <Badge variant="secondary" className="bg-green-100 text-green-700">Verified</Badge>
                            </>
                          )}
                          {profile.verificationStatus === "pending" && (
                            <>
                              <Clock className="w-5 h-5 text-yellow-500" />
                              <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Pending</Badge>
                              <Button size="sm" variant="outline" className="ml-2">
                                Upload Documents
                              </Button>
                            </>
                          )}
                          {profile.verificationStatus === "rejected" && (
                            <>
                              <XCircle className="w-5 h-5 text-red-500" />
                              <Badge variant="secondary" className="bg-red-100 text-red-700">Rejected</Badge>
                              <Button size="sm" variant="outline" className="ml-2">
                                Resubmit
                              </Button>
                            </>
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Verification is required to access all features</p>
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

            {/* Settings & Privacy - Combined */}
            <TabsContent value="settings">
              <div className="space-y-6">
                {/* Notifications */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bell className="w-5 h-5" />
                      Notifications
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Push Notifications</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Enable Push Notifications</p>
                            <p className="text-xs text-muted-foreground">Receive notifications on your device</p>
                          </div>
                          <Switch 
                            checked={notifications.pushNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('pushNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Group Messages</p>
                          </div>
                          <Switch 
                            checked={notifications.groupMessages}
                            onCheckedChange={(checked) => handleNotificationChange('groupMessages', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Event Reminders</p>
                          </div>
                          <Switch 
                            checked={notifications.eventReminders}
                            onCheckedChange={(checked) => handleNotificationChange('eventReminders', checked)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Email & Other</h4>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Email Notifications</p>
                          </div>
                          <Switch 
                            checked={notifications.emailNotifications}
                            onCheckedChange={(checked) => handleNotificationChange('emailNotifications', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Weekly Digest</p>
                          </div>
                          <Switch 
                            checked={notifications.weeklyDigest}
                            onCheckedChange={(checked) => handleNotificationChange('weeklyDigest', checked)}
                          />
                        </div>
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-sm font-medium">Sound Enabled</p>
                          </div>
                          <Switch 
                            checked={notifications.soundEnabled}
                            onCheckedChange={(checked) => handleNotificationChange('soundEnabled', checked)}
                          />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Privacy & Security */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Shield className="w-5 h-5" />
                      Privacy & Security
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Profile Visibility</label>
                        <Select value={privacy.profileVisibility} onValueChange={(value) => handlePrivacyChange('profileVisibility', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="public">Public</SelectItem>
                            <SelectItem value="members">Members Only</SelectItem>
                            <SelectItem value="private">Private</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Who can message you</label>
                        <Select value={privacy.allowMessages} onValueChange={(value) => handlePrivacyChange('allowMessages', value)}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="everyone">Everyone</SelectItem>
                            <SelectItem value="members">Members Only</SelectItem>
                            <SelectItem value="none">No One</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Show Online Status</p>
                        <Switch 
                          checked={privacy.showOnlineStatus}
                          onCheckedChange={(checked) => handlePrivacyChange('showOnlineStatus', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Show Email</p>
                        <Switch 
                          checked={privacy.showEmail}
                          onCheckedChange={(checked) => handlePrivacyChange('showEmail', checked)}
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium">Allow Tagging</p>
                        <Switch 
                          checked={privacy.allowTagging}
                          onCheckedChange={(checked) => handlePrivacyChange('allowTagging', checked)}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* App Preferences */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <SettingsIcon className="w-5 h-5" />
                      App Preferences
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Theme</label>
                      <Select value={preferences.theme} onValueChange={(value) => handlePreferenceChange('theme', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="light">Light</SelectItem>
                          <SelectItem value="dark">Dark</SelectItem>
                          <SelectItem value="auto">Auto</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Language</label>
                      <Select value={preferences.language} onValueChange={(value) => handlePreferenceChange('language', value)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Spanish</SelectItem>
                          <SelectItem value="fr">French</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-2 block">Font Size</label>
                      <Select value={preferences.fontSize} onValueChange={(value) => handlePreferenceChange('fontSize', value)}>
                        <SelectTrigger>
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
              </div>
            </TabsContent>

            {/* Transactions */}
            <TabsContent value="transactions">
              <div className="space-y-6">
                {/* Current Transactions */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Receipt className="w-5 h-5" />
                      Current Transactions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.current.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className={`w-3 h-3 rounded-full ${
                              transaction.status === 'pending' ? 'bg-yellow-500' : 
                              transaction.status === 'processing' ? 'bg-blue-500' : 'bg-green-500'
                            }`} />
                            <div>
                              <p className="font-medium">{transaction.item}</p>
                              <p className="text-sm text-muted-foreground">
                                {transaction.type === 'sale' ? `Buyer: ${transaction.buyer}` : `Seller: ${transaction.seller}`}
                              </p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${transaction.amount}</p>
                            <Badge variant="secondary">{transaction.status}</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Transaction History */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="w-5 h-5" />
                      Transaction History
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {transactions.history.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                          <div className="flex items-center gap-4">
                            <div className="w-3 h-3 rounded-full bg-green-500" />
                            <div>
                              <p className="font-medium">{transaction.item}</p>
                              <p className="text-sm text-muted-foreground">{transaction.date}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">${transaction.amount}</p>
                            <Badge variant="secondary" className="bg-green-100 text-green-700">Completed</Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Bank Information for Sellers */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Banknote className="w-5 h-5" />
                      Bank Information (Seller)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium mb-2 block">Account Holder</label>
                        <Input value={bankInfo.accountHolder} readOnly />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Bank Name</label>
                        <Input value={bankInfo.bankName} readOnly />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Account Number</label>
                        <Input value={bankInfo.accountNumber} readOnly />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-2 block">Routing Number</label>
                        <Input value={bankInfo.routingNumber} readOnly />
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {bankInfo.verified ? (
                        <>
                          <CheckCircle className="w-5 h-5 text-green-500" />
                          <span className="text-sm text-green-600">Bank account verified</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-5 h-5 text-yellow-500" />
                          <span className="text-sm text-yellow-600">Verification pending</span>
                        </>
                      )}
                    </div>
                    <Button variant="outline" size="sm">Update Bank Information</Button>
                  </CardContent>
                </Card>

                {/* Payment Options for Buyers */}
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Wallet className="w-5 h-5" />
                      Payment Options (Buyer)
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-3">Saved Cards</h4>
                      <div className="space-y-3">
                        {paymentOptions.cards.map((card) => (
                          <div key={card.id} className="flex items-center justify-between p-3 border rounded-lg">
                            <div className="flex items-center gap-3">
                              <CreditCard className="w-5 h-5" />
                              <div>
                                <p className="font-medium">{card.type} ending in {card.last4}</p>
                                <p className="text-sm text-muted-foreground">Expires {card.expiry}</p>
                              </div>
                            </div>
                            <div className="flex items-center gap-2">
                              {card.isDefault && <Badge variant="secondary">Default</Badge>}
                              <Button variant="outline" size="sm">Edit</Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Button variant="outline" size="sm" className="mt-3">
                        + Add New Card
                      </Button>
                    </div>
                    
                    <Separator />
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-500 rounded flex items-center justify-center text-white text-sm font-bold">P</div>
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-muted-foreground">{paymentOptions.paypal.email}</p>
                          </div>
                        </div>
                        <Button variant="outline" size="sm">
                          {paymentOptions.paypal.connected ? 'Disconnect' : 'Connect'}
                        </Button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-gray-900 rounded flex items-center justify-center text-white text-sm font-bold">A</div>
                          <div>
                            <p className="font-medium">Apple Pay</p>
                            <p className="text-sm text-muted-foreground">Quick and secure payments</p>
                          </div>
                        </div>
                        <Switch checked={paymentOptions.applePay.enabled} />
                      </div>
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
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Current Plan</p>
                        <p className="text-sm text-muted-foreground">Premium Member</p>
                      </div>
                      <Badge className="bg-gradient-to-br from-orange-400 to-red-500 text-white">Premium</Badge>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Billing</span>
                        <span>$9.99/month</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Next Payment</span>
                        <span>Feb 15, 2024</span>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Button className="w-full bg-gradient-to-br from-orange-400 to-red-500 text-white">
                        Manage Subscription
                      </Button>
                      <Button variant="outline" className="w-full">
                        Billing History
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Lock className="w-5 h-5" />
                      Account Security
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
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="w-5 h-5" />
                      Data & Privacy
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button variant="outline" className="w-full justify-start">
                      <Download className="w-4 h-4 mr-2" />
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      <Shield className="w-4 h-4 mr-2" />
                      Privacy Settings
                    </Button>
                    <Button variant="outline" className="w-full justify-start text-red-600">
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete Account
                    </Button>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <LogOut className="w-5 h-5" />
                      Session Management
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
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
                    <Separator />
                    <Button variant="outline" className="w-full justify-start text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      Sign Out of All Devices
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Help & Support */}
            <TabsContent value="help">
              <div className="space-y-6">
                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <HelpCircle className="w-5 h-5" />
                      Help Center
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <h4 className="font-medium">Get Support</h4>
                      <Button variant="outline" className="w-full justify-start">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Contact Support
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <HelpCircle className="w-4 h-4 mr-2" />
                        FAQ
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Phone className="w-4 h-4 mr-2" />
                        Call Support: 1-800-HELP
                      </Button>
                    </div>
                    <div className="space-y-3">
                      <h4 className="font-medium">Resources</h4>
                      <Button variant="outline" className="w-full justify-start">
                        <Users className="w-4 h-4 mr-2" />
                        Community Guidelines
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Shield className="w-4 h-4 mr-2" />
                        Privacy Policy
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Terms of Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-4">
                      <div className="border-l-4 border-blue-500 pl-4">
                        <h4 className="font-medium">How do I verify my account?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Upload a government-issued ID and wait 2-3 business days for verification. You'll receive an email notification once complete.
                        </p>
                      </div>
                      <div className="border-l-4 border-green-500 pl-4">
                        <h4 className="font-medium">How do marketplace transactions work?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Buyers pay through our secure system. Funds are held until the seller confirms shipment and buyer confirms receipt.
                        </p>
                      </div>
                      <div className="border-l-4 border-orange-500 pl-4">
                        <h4 className="font-medium">What payment methods are accepted?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          We accept major credit cards, PayPal, and Apple Pay. Bank transfers are available for sellers receiving payments.
                        </p>
                      </div>
                      <div className="border-l-4 border-purple-500 pl-4">
                        <h4 className="font-medium">How do I create or join a group?</h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          Visit the Groups page to browse existing groups or click "Create Group" to start your own community around shared interests.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="shadow-soft">
                  <CardHeader>
                    <CardTitle>App Information</CardTitle>
                  </CardHeader>
                  <CardContent className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <h4 className="font-medium">Version Details</h4>
                      <div className="space-y-1">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Version</span>
                          <span>2.1.0</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Last Updated</span>
                          <span>Jan 15, 2024</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Platform</span>
                          <span>Web</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Build</span>
                          <span>2024.01.15.1</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-medium">Quick Links</h4>
                      <div className="space-y-2">
                        <Button variant="outline" className="w-full justify-start">
                          <Globe className="w-4 h-4 mr-2" />
                          About Us
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <Users className="w-4 h-4 mr-2" />
                          Community Forum
                        </Button>
                        <Button variant="outline" className="w-full justify-start">
                          <MessageSquare className="w-4 h-4 mr-2" />
                          Feature Requests
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Settings;