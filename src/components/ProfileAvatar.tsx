import { useState } from "react";
import { Camera, CheckCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  showVerified?: boolean;
  editable?: boolean;
  className?: string;
}

export function ProfileAvatar({ 
  size = "md", 
  showVerified = false, 
  editable = false,
  className = "" 
}: ProfileAvatarProps) {
  const { user } = useAuth();
  const [avatarSrc, setAvatarSrc] = useState<string | null>(null);
  
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-20 h-20",
    xl: "w-24 h-24"
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setAvatarSrc(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Mock verified status - you can replace this with actual verification logic
  const isVerified = user?.email === "verified@example.com" || showVerified;

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Avatar className={`${sizeClasses[size]} border-2 border-white shadow-lg`}>
          <AvatarImage src={avatarSrc || "/api/placeholder/96/96"} />
          <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white font-semibold">
            {user?.user_metadata?.display_name?.charAt(0) || user?.email?.charAt(0) || "U"}
          </AvatarFallback>
        </Avatar>
        
        {editable && (
          <>
            <input
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
              id="avatar-upload"
            />
            <Button
              size="icon"
              variant="ghost"
              className="absolute -bottom-1 -right-1 w-6 h-6 bg-white shadow-md hover:bg-gray-50 rounded-full"
              onClick={() => document.getElementById('avatar-upload')?.click()}
            >
              <Camera className="w-3 h-3" />
            </Button>
          </>
        )}
        
        {isVerified && showVerified && (
          <Badge className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-1 rounded-full">
            <CheckCircle className="w-3 h-3" />
          </Badge>
        )}
      </div>
    </div>
  );
}