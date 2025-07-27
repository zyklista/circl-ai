import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
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
import Settings from "./pages/Settings";
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
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/groups" element={<Groups />} />
          <Route path="/groups/:id" element={<GroupPage />} />
          <Route path="/groups/:id/edit" element={<EditGroup />} />
          <Route path="/groups/:id/manage-members" element={<ManageMembers />} />
          <Route path="/groups/:id/members" element={<GroupMembers />} />
          <Route path="/groups/:id/share" element={<ShareGroup />} />
          <Route path="/groups/:id/assign-admin" element={<AssignAdmin />} />
          <Route path="/groups/:id/leave" element={<LeaveGroup />} />
          <Route path="/groups/:id/delete" element={<DeleteGroup />} />
          <Route path="/groups/:groupId/posts/:postId" element={<PostPage />} />
          <Route path="/events" element={<Events />} />
          <Route path="/events/create" element={<CreateEvent />} />
          <Route path="/events/:id" element={<EventPage />} />
          <Route path="/events/:id/edit" element={<EditEvent />} />
          <Route path="/events/:id/share" element={<ShareEvent />} />
          <Route path="/events/:id/join" element={<JoinEvent />} />
          <Route path="/events/:id/cancel" element={<CancelEvent />} />
          <Route path="/marketplace" element={<Marketplace />} />
          <Route path="/marketplace/item/:id" element={<ItemPage />} />
          <Route path="/marketplace/checkout/:id" element={<Checkout />} />
          <Route path="/transactions/:id" element={<Transactions />} />
          <Route path="/marketplace/sell" element={<SellItem />} />
          <Route path="/marketplace/share/:id" element={<ShareItem />} />
          <Route path="/marketplace/message/:sellerId" element={<SellerInbox />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
