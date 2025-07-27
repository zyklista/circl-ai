import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Search, Send, Plus } from "lucide-react";

const conversations = [
  {
    id: 1,
    name: "Creative Minds Group",
    lastMessage: "Great ideas in today's discussion!",
    time: "2h ago",
    unread: 3,
    isGroup: true,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 2,
    name: "John Doe",
    lastMessage: "Thanks for the event invite",
    time: "4h ago",
    unread: 0,
    isGroup: false,
    avatar: "/api/placeholder/40/40"
  },
  {
    id: 3,
    name: "Tech Innovators",
    lastMessage: "Sarah: Check out this new AI tool...",
    time: "1d ago",
    unread: 1,
    isGroup: true,
    avatar: "/api/placeholder/40/40"
  }
];

const currentMessages = [
  {
    id: 1,
    sender: "Alice Brown",
    message: "Hey everyone! How's the project coming along?",
    time: "10:30 AM",
    isMe: false,
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 2,
    sender: "Me",
    message: "Making great progress! Should be done by tomorrow.",
    time: "10:35 AM",
    isMe: true,
    avatar: "/api/placeholder/32/32"
  },
  {
    id: 3,
    sender: "Mike Chen",
    message: "Awesome! Can't wait to see the results 🚀",
    time: "10:40 AM",
    isMe: false,
    avatar: "/api/placeholder/32/32"
  }
];

const Messages = () => {
  return (
    <Layout title="Messages">
      <div className="h-[calc(100vh-120px)] flex bg-community-bg">
        {/* Conversations List */}
        <div className="w-1/3 border-r border-border bg-community-surface">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold text-foreground">Messages</h2>
              <Button size="icon" variant="ghost">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search conversations..." className="pl-9" />
            </div>
          </div>
          
          <div className="overflow-y-auto">
            {conversations.map((conversation) => (
              <div key={conversation.id} className="p-4 border-b border-border hover:bg-community-hover cursor-pointer transition-smooth">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarImage src={conversation.avatar} />
                    <AvatarFallback>{conversation.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-foreground truncate">{conversation.name}</h3>
                      <span className="text-xs text-muted-foreground">{conversation.time}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                      {conversation.unread > 0 && (
                        <Badge className="bg-primary text-primary-foreground text-xs px-2 py-1">
                          {conversation.unread}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col">
          {/* Chat Header */}
          <div className="p-4 border-b border-border bg-community-surface">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarImage src="/api/placeholder/40/40" />
                <AvatarFallback>CM</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-foreground">Creative Minds Group</h3>
                <p className="text-sm text-muted-foreground">125 members • 12 online</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((message) => (
              <div key={message.id} className={`flex gap-3 ${message.isMe ? 'flex-row-reverse' : ''}`}>
                {!message.isMe && (
                  <Avatar className="w-8 h-8">
                    <AvatarImage src={message.avatar} />
                    <AvatarFallback>{message.sender.charAt(0)}</AvatarFallback>
                  </Avatar>
                )}
                <div className={`max-w-[70%] ${message.isMe ? 'text-right' : ''}`}>
                  {!message.isMe && (
                    <p className="text-xs text-muted-foreground mb-1">{message.sender}</p>
                  )}
                  <div className={`rounded-lg p-3 ${
                    message.isMe 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-community-hover text-foreground'
                  }`}>
                    <p className="text-sm">{message.message}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="p-4 border-t border-border bg-community-surface">
            <div className="flex gap-2">
              <Input placeholder="Type a message..." className="flex-1" />
              <Button size="icon" className="bg-gradient-primary text-white">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Messages;