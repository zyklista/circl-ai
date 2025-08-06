import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import Groups from "./pages/Groups";
import GroupPage from "./pages/GroupPage";
import PostPage from "./pages/PostPage";
import Events from "./pages/Events";
import EventPage from "./pages/EventPage";
import EditEvent from "./pages/EditEvent";
import ShareEvent from "./pages/ShareEvent";
import JoinEvent from "./pages/JoinEvent";
import CreateEvent from "./pages/CreateEvent";
import CancelEvent from "./pages/CancelEvent";
import Marketplace from "./pages/Marketplace";
import ItemPage from "./pages/ItemPage";
import Checkout from "./pages/Checkout";
import PaymentSuccess from "./pages/PaymentSuccess";
import SellItem from "./pages/SellItem";
import ShareItem from "./pages/ShareItem";
import SellerInbox from "./pages/SellerInbox";
import Messages from "./pages/Messages";
import Profile from "./pages/Profile";
import Membership from "./pages/Membership";
import Transactions from "./pages/Transactions";
import TransactionsList from "./pages/TransactionsList";
import Settings from "./pages/Settings";
import SettingsPrivacy from "./pages/SettingsPrivacy";
import Notifications from "./pages/Notifications";
import Security from "./pages/Security";
import PaymentMethods from "./pages/PaymentMethods";
import ActivityLog from "./pages/ActivityLog";
import AccountAccess from "./pages/AccountAccess";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";
import EditGroup from "./pages/EditGroup";
import ManageMembers from "./pages/ManageMembers";
import GroupMembers from "./pages/GroupMembers";
import ShareGroup from "./pages/ShareGroup";
import AssignAdmin from "./pages/AssignAdmin";
import LeaveGroup from "./pages/LeaveGroup";
import DeleteGroup from "./pages/DeleteGroup";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/auth" element={<Auth />} />
            <Route path="/" element={<ProtectedRoute><Index /></ProtectedRoute>} />
            <Route path="/groups" element={<ProtectedRoute><Groups /></ProtectedRoute>} />
            <Route path="/groups/:id" element={<ProtectedRoute><GroupPage /></ProtectedRoute>} />
            <Route path="/groups/:id/edit" element={<ProtectedRoute><EditGroup /></ProtectedRoute>} />
            <Route path="/groups/:id/manage-members" element={<ProtectedRoute><ManageMembers /></ProtectedRoute>} />
            <Route path="/groups/:id/members" element={<ProtectedRoute><GroupMembers /></ProtectedRoute>} />
            <Route path="/groups/:id/share" element={<ProtectedRoute><ShareGroup /></ProtectedRoute>} />
            <Route path="/groups/:id/assign-admin" element={<ProtectedRoute><AssignAdmin /></ProtectedRoute>} />
            <Route path="/groups/:id/leave" element={<ProtectedRoute><LeaveGroup /></ProtectedRoute>} />
            <Route path="/groups/:id/delete" element={<ProtectedRoute><DeleteGroup /></ProtectedRoute>} />
            <Route path="/groups/:groupId/posts/:postId" element={<ProtectedRoute><PostPage /></ProtectedRoute>} />
            <Route path="/events" element={<ProtectedRoute><Events /></ProtectedRoute>} />
            <Route path="/events/create" element={<ProtectedRoute><CreateEvent /></ProtectedRoute>} />
            <Route path="/events/:id" element={<ProtectedRoute><EventPage /></ProtectedRoute>} />
            <Route path="/events/:id/edit" element={<ProtectedRoute><EditEvent /></ProtectedRoute>} />
            <Route path="/events/:id/share" element={<ProtectedRoute><ShareEvent /></ProtectedRoute>} />
            <Route path="/events/:id/join" element={<ProtectedRoute><JoinEvent /></ProtectedRoute>} />
            <Route path="/events/:id/cancel" element={<ProtectedRoute><CancelEvent /></ProtectedRoute>} />
            <Route path="/marketplace" element={<ProtectedRoute><Marketplace /></ProtectedRoute>} />
            <Route path="/marketplace/item/:id" element={<ProtectedRoute><ItemPage /></ProtectedRoute>} />
            <Route path="/marketplace/checkout/:id" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="/transactions/:id" element={<ProtectedRoute><Transactions /></ProtectedRoute>} />
            <Route path="/transactions/list" element={<ProtectedRoute><TransactionsList /></ProtectedRoute>} />
            <Route path="/marketplace/sell" element={<ProtectedRoute><SellItem /></ProtectedRoute>} />
            <Route path="/marketplace/share/:id" element={<ProtectedRoute><ShareItem /></ProtectedRoute>} />
            <Route path="/marketplace/message/:sellerId" element={<ProtectedRoute><SellerInbox /></ProtectedRoute>} />
            <Route path="/payment-success" element={<ProtectedRoute><PaymentSuccess /></ProtectedRoute>} />
            <Route path="/messages" element={<ProtectedRoute><Messages /></ProtectedRoute>} />
            <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
            <Route path="/membership" element={<ProtectedRoute><Membership /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
            <Route path="/settings/privacy" element={<ProtectedRoute><SettingsPrivacy /></ProtectedRoute>} />
            <Route path="/settings/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
            <Route path="/settings/security" element={<ProtectedRoute><Security /></ProtectedRoute>} />
            <Route path="/settings/payment-methods" element={<ProtectedRoute><PaymentMethods /></ProtectedRoute>} />
            <Route path="/settings/activity-log" element={<ProtectedRoute><ActivityLog /></ProtectedRoute>} />
            <Route path="/settings/account-access" element={<ProtectedRoute><AccountAccess /></ProtectedRoute>} />
            <Route path="/settings/help-support" element={<ProtectedRoute><HelpSupport /></ProtectedRoute>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
