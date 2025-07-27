import { Layout } from "@/components/Layout";
import { CreatePost } from "@/components/CreatePost";
import { PostCard } from "@/components/PostCard";

// Sample post data
const samplePosts = [
  {
    id: "1",
    author: {
      name: "Alex Chen",
      handle: "alexchen",
      avatar: "/api/placeholder/40/40"
    },
    content: "Just launched our new community feature! 🚀 Excited to see how everyone will use it to connect and share amazing content. What's the first thing you'd like to post?",
    timestamp: "2 hours ago",
    likes: 24,
    comments: 8,
    shares: 3
  },
  {
    id: "2", 
    author: {
      name: "Sarah Johnson",
      handle: "sarahj",
      avatar: "/api/placeholder/40/40"
    },
    content: "Had an amazing time at the local tech meetup yesterday! Met so many inspiring developers and learned about the latest trends in web development. The community here is incredible! 💻✨",
    image: "/api/placeholder/600/300",
    timestamp: "4 hours ago",
    likes: 42,
    comments: 15,
    shares: 7
  },
  {
    id: "3",
    author: {
      name: "Mike Rodriguez",
      handle: "mikecodes",
      avatar: "/api/placeholder/40/40"
    },
    content: "Quick tip: When building React components, always think about reusability first. It will save you tons of time in the long run! What's your favorite React pattern?",
    timestamp: "6 hours ago", 
    likes: 18,
    comments: 12,
    shares: 5
  }
];

const Index = () => {
  return (
    <Layout title="Community Feed">
      <div className="max-w-2xl mx-auto">
        <CreatePost />
        
        <div className="space-y-6">
          {samplePosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Index;
