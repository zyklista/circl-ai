import { Layout } from "@/components/Layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, HelpCircle, MessageCircle, Book, Phone, Mail } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HelpSupport = () => {
  const navigate = useNavigate();

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Go to the login page and click 'Forgot Password'. You'll receive an email with reset instructions."
    },
    {
      question: "How do I upgrade my membership?",
      answer: "Visit the Membership page in your account settings to view and upgrade your current plan."
    },
    {
      question: "Can I cancel my subscription?",
      answer: "Yes, you can cancel anytime from the Payment Methods section. Your access will continue until the current billing period ends."
    },
    {
      question: "How do I report inappropriate content?",
      answer: "Use the report button on any post or message, or contact our support team directly."
    }
  ];

  return (
    <Layout title="Help & Support">
      <div className="min-h-screen p-6 bg-gradient-to-br from-background to-secondary/10">
        <div className="max-w-4xl mx-auto">
          <Button 
            variant="ghost" 
            onClick={() => navigate(-1)}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Help & Support</h1>
            <p className="text-muted-foreground">Get help and contact customer support</p>
          </div>

          <div className="grid gap-6">
            <div className="grid md:grid-cols-3 gap-4">
              <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <MessageCircle className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-sm text-muted-foreground mb-3">Chat with our support team</p>
                  <Button size="sm">Start Chat</Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Mail className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-sm text-muted-foreground mb-3">Get help via email</p>
                  <Button size="sm" variant="outline">Send Email</Button>
                </CardContent>
              </Card>
              
              <Card className="shadow-soft hover:shadow-medium transition-shadow cursor-pointer">
                <CardContent className="p-6 text-center">
                  <Book className="w-8 h-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Help Center</h3>
                  <p className="text-sm text-muted-foreground mb-3">Browse our knowledge base</p>
                  <Button size="sm" variant="outline">Visit Help Center</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5" />
                  Frequently Asked Questions
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <h4 className="font-medium mb-2">{faq.question}</h4>
                    <p className="text-sm text-muted-foreground">{faq.answer}</p>
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>Contact Form</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Subject</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>General Question</option>
                      <option>Technical Issue</option>
                      <option>Billing Question</option>
                      <option>Feature Request</option>
                      <option>Report a Bug</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Priority</label>
                    <select className="w-full px-3 py-2 border rounded-md bg-background">
                      <option>Low</option>
                      <option>Medium</option>
                      <option>High</option>
                      <option>Urgent</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Email</label>
                  <Input type="email" placeholder="your.email@example.com" />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <Textarea 
                    placeholder="Please describe your issue or question in detail..." 
                    rows={5}
                  />
                </div>
                <Button className="w-full">Send Message</Button>
              </CardContent>
            </Card>

            <Card className="shadow-soft">
              <CardHeader>
                <CardTitle>System Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>Website</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>API</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Messaging</span>
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded-full">Operational</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Payments</span>
                    <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-sm rounded-full">Degraded</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default HelpSupport;