import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Bell, MessageCircle, LogOut, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useRoleAuth } from "@/hooks/useRoleAuth";
import { logSecurityEvent } from "@/lib/security";
import { useNavigate } from "react-router-dom";

interface LayoutProps {
  children: ReactNode;
  title?: string;
}

export function Layout({ children, title }: LayoutProps) {
  const isMobile = useIsMobile();
  const { signOut, user } = useAuth();
  const { isAdmin, isModerator } = useRoleAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await logSecurityEvent('user_logout', {}, user?.id);
      await signOut();
    } catch (error) {
      console.error('Error during sign out:', error);
    }
  };
  
  return (
    <SidebarProvider defaultOpen={!isMobile}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Top Right Fixed Actions */}
          <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 h-10 w-10"
              onClick={() => navigate('/messages')}
            >
              <Bell className="w-5 h-5 text-slate-700" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 h-10 w-10"
              onClick={() => navigate('/messages')}
            >
              <MessageCircle className="w-5 h-5 text-slate-700" />
            </Button>
            {(isAdmin || isModerator) && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 h-10 w-10"
                title="Admin Panel"
              >
                <Shield className="w-5 h-5 text-slate-700" />
              </Button>
            )}
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleSignOut}
              className="bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 h-10 w-10"
              title="Sign out"
            >
              <LogOut className="w-5 h-5 text-slate-700" />
            </Button>
          </div>

          {/* Top Left Dynamic Trigger */}
          <div className="fixed top-4 left-4 z-50">
            <SidebarTrigger className="bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 h-10 w-10 rounded-lg" />
          </div>
          
          <main className="flex-1 pt-16 px-4 pb-6">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}