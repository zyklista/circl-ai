import { useState } from "react";
import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  User, 
  Settings as SettingsIcon, 
  Receipt, 
  Shield, 
  HelpCircle,
  ChevronRight,
  Bell,
  Lock,
  CreditCard,
  History,
  KeyRound,
  LogOut
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

const Settings = () => {
  const { toast } = useToast();
  const { user } = useAuth();

  const menuItems = [
    {
      icon: User,
      title: "Profile",
      description: "Manage your personal information and preferences",
      action: () => toast({ title: "Profile Settings", description: "Profile management coming soon!" })
    },
    {
      icon: SettingsIcon,
      title: "Settings & Privacy",
      description: "Control your account settings and privacy options",
      action: () => toast({ title: "Settings & Privacy", description: "Privacy settings coming soon!" })
    },
    {
      icon: Receipt,
      title: "Transactions",
      description: "View your purchase and sales history",
      action: () => toast({ title: "Transactions", description: "Transaction history coming soon!" })
    },
    {
      icon: Bell,
      title: "Notifications",
      description: "Manage your notification preferences",
      action: () => toast({ title: "Notifications", description: "Notification settings coming soon!" })
    },
    {
      icon: Shield,
      title: "Security",
      description: "Two-factor authentication and security settings",
      action: () => toast({ title: "Security", description: "Security settings coming soon!" })
    },
    {
      icon: CreditCard,
      title: "Payment Methods",
      description: "Manage your cards and payment options",
      action: () => toast({ title: "Payment Methods", description: "Payment settings coming soon!" })
    },
    {
      icon: History,
      title: "Activity Log",
      description: "Review your recent account activity",
      action: () => toast({ title: "Activity Log", description: "Activity log coming soon!" })
    },
    {
      icon: KeyRound,
      title: "Account Access",
      description: "Manage connected apps and API access",
      action: () => toast({ title: "Account Access", description: "Access management coming soon!" })
    },
    {
      icon: HelpCircle,
      title: "Help & Support",
      description: "Get help and contact customer support",
      action: () => toast({ title: "Help & Support", description: "Support center coming soon!" })
    }
  ];

  return (
    <Layout title="Settings">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--settings-bg)' }}
      >
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
                onClick={item.action}
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

          {/* Quick Actions */}
          <Card className="mt-8 shadow-soft border-destructive/20">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-destructive/5 rounded-lg border border-destructive/20">
                  <div>
                    <h4 className="font-medium text-foreground">Sign Out</h4>
                    <p className="text-sm text-muted-foreground">Sign out of your account on this device</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="border-destructive text-destructive hover:bg-destructive hover:text-white"
                    onClick={() => toast({ title: "Sign Out", description: "Sign out functionality coming soon!" })}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
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

export default Settings;