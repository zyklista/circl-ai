import { ReactNode } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Settings, Users, Calendar, ShoppingCart, Home, MessageCircle } from "lucide-react";
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
  
  return (
    <SidebarProvider defaultOpen={false}>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
        <AppSidebar />
        
        <div className="flex-1 flex flex-col min-w-0 relative">
          {/* Top Right Settings Icon */}
          <div className="fixed top-4 right-4 z-50">
            <Button 
              variant="ghost" 
              size="icon" 
              className="bg-white/80 backdrop-blur-sm shadow-lg hover:bg-white/90 h-10 w-10"
              onClick={() => navigate('/settings')}
              title="Settings"
            >
              <Settings className="w-5 h-5 text-slate-700" />
            </Button>
          </div>
          
          <main className="flex-1 pt-16 px-4 pb-6 mb-16 md:mb-0">
            {children}
          </main>
          
          {/* Mobile Bottom Navigation */}
          {isMobile && (
            <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-border z-50">
              <div className="flex items-center justify-around py-2 px-4">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex flex-col items-center gap-1 h-12 flex-1 p-1"
                  onClick={() => navigate('/')}
                >
                  <Home className="w-5 h-5" />
                  <span className="text-xs">Home</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex flex-col items-center gap-1 h-12 flex-1 p-1"
                  onClick={() => navigate('/groups')}
                >
                  <Users className="w-5 h-5" />
                  <span className="text-xs">Groups</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex flex-col items-center gap-1 h-12 flex-1 p-1"
                  onClick={() => navigate('/events')}
                >
                  <Calendar className="w-5 h-5" />
                  <span className="text-xs">Events</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex flex-col items-center gap-1 h-12 flex-1 p-1"
                  onClick={() => navigate('/marketplace')}
                >
                  <ShoppingCart className="w-5 h-5" />
                  <span className="text-xs">Market</span>
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="flex flex-col items-center gap-1 h-12 flex-1 p-1"
                  onClick={() => navigate('/messages')}
                >
                  <MessageCircle className="w-5 h-5" />
                  <span className="text-xs">Messages</span>
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </SidebarProvider>
  );
}