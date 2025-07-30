import { useState } from "react";
import { MessageSquare, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

export function FloatingActions() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    try {
      // Here you would integrate with your AI customer support
      // For now, we'll simulate a response
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Message Sent",
        description: "Our AI assistant will respond shortly.",
      });
      
      setMessage("");
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isOpen) {
    return (
      <Card className="fixed bottom-6 right-6 w-80 z-50 shadow-2xl bg-white dark:bg-slate-800 border-2 border-primary/20">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
          <CardTitle className="text-lg font-semibold">AI Support</CardTitle>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-6 w-6"
          >
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted/50 p-3 rounded-lg">
            <p className="text-sm text-muted-foreground">
              Hi! I'm your AI assistant. How can I help you today?
            </p>
          </div>
          <Textarea
            placeholder="Type your message here..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="min-h-[80px]"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!message.trim() || isLoading}
            className="w-full bg-gradient-to-r from-primary to-accent text-white"
          >
            <Send className="w-4 h-4 mr-2" />
            {isLoading ? "Sending..." : "Send Message"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Button
      onClick={() => setIsOpen(true)}
      size="icon"
      className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-r from-primary to-accent text-white shadow-lg hover:shadow-xl transition-all z-50 rounded-full"
    >
      <MessageSquare className="w-6 h-6" />
    </Button>
  );
}