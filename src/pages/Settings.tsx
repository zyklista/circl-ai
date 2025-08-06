import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Settings as SettingsIcon, Receipt, Shield, HelpCircle, ChevronRight, Bell, Lock, CreditCard, History, KeyRound, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
const Settings = () => {
  const { signOut } = useAuth();
  const navigate = useNavigate();
  
  const menuItems = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your personal information and preferences",
      path: "/profile"
    },
    {
      icon: SettingsIcon,
      title: "Settings & Privacy",
      description: "Control your account settings and privacy options",
      path: "/settings/privacy"
    },
    {
      icon: Receipt,
      title: "Transactions",
      description: "View your purchase and sales history",
      path: "/transactions/list"
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your notification preferences",
      path: "/settings/notifications"
    },
    {
      icon: Shield,
      title: "Security",
      description: "Two-factor authentication and security settings",
      path: "/settings/security"
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your cards and payment options",
      path: "/settings/payment-methods"
    },
    {
      icon: History,
      title: "Activity Log",
      description: "Review your recent account activity",
      path: "/settings/activity-log"
    },
    {
      icon: KeyRound,
      title: "Account Access",
      description: "Manage connected apps and API access",
      path: "/settings/account-access"
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact customer support",
      path: "/settings/help-support"
    }
  ];
  return <Layout title="Settings">
      <div className="min-h-screen p-6" style={{
      background: 'var(--settings-bg)'
    }}>
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Settings</h1>
            <p className="text-muted-foreground">Manage your account settings and preferences</p>
          </div>

          <div className="grid gap-4">
            {menuItems.map((item, index) => (
              <Card 
                key={index} 
                className="shadow-soft hover:shadow-medium transition-all duration-200 cursor-pointer hover:scale-[1.02] border border-border/50" 
                onClick={() => navigate(item.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                        <item.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Logout Button */}
          <Card className="shadow-soft border-red-200">
            <CardContent className="p-6">
              <Button 
                variant="destructive" 
                onClick={signOut}
                className="w-full flex items-center gap-3"
              >
                <LogOut className="w-5 h-5" />
                Log Out
              </Button>
            </CardContent>
          </Card>
          
        </div>
      </div>
    </Layout>;
};
export default Settings;