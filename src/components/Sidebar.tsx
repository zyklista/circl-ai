import { useState } from "react";
import { 
  Home, 
  Users, 
  MessageSquare, 
  Star, 
  Settings,
  Hash,
  TrendingUp,
  Calendar
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const mainItems = [
  { title: "Home", url: "/", icon: Home },
  { title: "Groups", url: "/groups", icon: Users },
  { title: "Events", url: "/events", icon: Calendar },
  { title: "Marketplace", url: "/marketplace", icon: TrendingUp },
  { title: "Messages", url: "/messages", icon: MessageSquare },
];

const communityItems = [
  { title: "General", url: "/community/general", icon: Hash },
  { title: "Tech Talk", url: "/community/tech", icon: Hash },
  { title: "Random", url: "/community/random", icon: Hash },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;
  const isCollapsed = state === "collapsed";

  const isActive = (path: string) => {
    if (path === "/") {
      return currentPath === "/";
    }
    return currentPath.startsWith(path);
  };

  const getNavClasses = (active: boolean) =>
    active 
      ? "bg-gradient-primary text-white shadow-soft" 
      : "hover:bg-community-hover text-foreground";

  return (
    <Sidebar className={isCollapsed ? "w-14" : "w-64"}>
      <SidebarContent className="bg-community-bg">
        {/* Main Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-medium">
            {!isCollapsed && "Navigation"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink 
                      to={item.url} 
                      end={item.url === "/"} 
                      className={`${getNavClasses(isActive(item.url))} transition-smooth rounded-lg`}
                    >
                      <item.icon className="w-5 h-5" />
                      {!isCollapsed && <span className="font-medium">{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>


        {/* Settings */}
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton asChild>
                  <NavLink 
                    to="/settings" 
                    className={`${getNavClasses(isActive("/settings"))} transition-smooth rounded-lg`}
                  >
                    <Settings className="w-5 h-5" />
                    {!isCollapsed && <span className="font-medium">Settings</span>}
                  </NavLink>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}