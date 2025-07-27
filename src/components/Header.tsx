import { Menu, MessageCircle, Bell, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRoleAuth } from "@/hooks/useRoleAuth";
import { logSecurityEvent } from "@/lib/security";

interface HeaderProps {
  title?: string;
}

export function Header({ title }: HeaderProps) {
  const { signOut, user } = useAuth();
  const { isAdmin, isModerator } = useRoleAuth();

  const handleSignOut = async () => {
    try {
      await logSecurityEvent('user_logout', {}, user?.id);
      await signOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-community-surface/95 backdrop-blur-sm border-b border-border shadow-soft">
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <SidebarTrigger className="text-primary p-2 hover:bg-community-hover rounded-md transition-smooth">
            <Menu className="w-5 h-5" />
          </SidebarTrigger>
          {title && <h1 className="text-lg font-semibold text-foreground">{title}</h1>}
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="text-primary hover:bg-community-hover transition-smooth">
            <Bell className="w-5 h-5" />
          </Button>
          <Button variant="ghost" size="icon" className="text-primary hover:bg-community-hover transition-smooth">
            <MessageCircle className="w-5 h-5" />
          </Button>
          {(isAdmin || isModerator) && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="text-primary hover:bg-community-hover transition-smooth"
              title="Admin Panel"
            >
              <Shield className="w-5 h-5" />
            </Button>
          )}
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={handleSignOut}
            className="text-primary hover:bg-community-hover transition-smooth"
            title="Sign out"
          >
            <LogOut className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </header>
  );
}