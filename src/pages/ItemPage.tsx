import { useParams, useNavigate } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Star, Heart, ShoppingCart, Share2, MessageCircle } from "lucide-react";

// Sample item data - in a real app this would come from an API
const getItemById = (id: string) => {
  const items = [
    {
      id: "1",
      title: "Handcrafted Pottery Set",
      price: "$45",
      originalPrice: null,
      rating: 4.8,
      reviews: 23,
      seller: "ArtisanCrafts",
      image: "/api/placeholder/400/400",
      category: "Art & Crafts",
      description: "Beautiful handcrafted pottery set made by local artisans. Perfect for your dining table or as a unique gift. Each piece is carefully crafted with attention to detail.",
      features: ["Handmade ceramic", "Food safe", "Dishwasher friendly", "Set of 4 pieces"],
      isHot: true
    },
    {
      id: "2",
      title: "Vintage Camera Collection",
      price: "$120",
      originalPrice: null,
      rating: 4.9,
      reviews: 12,
      seller: "RetroTech",
      image: "/api/placeholder/400/400",
      category: "Electronics",
      description: "Vintage camera in excellent condition. Perfect for photography enthusiasts and collectors.",
      features: ["Original lens included", "Working condition", "Vintage leather case", "Manual included"],
      isHot: true
    },
    {
      id: "3",
      title: "Organic Herb Garden Kit",
      price: "$28",
      originalPrice: "$40",
      rating: 4.7,
      reviews: 45,
      seller: "GreenThumb",
      image: "/api/placeholder/400/400",
      category: "Garden",
      description: "Complete organic herb garden kit with everything you need to start growing fresh herbs at home.",
      features: ["5 herb varieties", "Organic seeds", "Planting pots included", "Growing guide"],
      isHot: false
    },
    {
      id: "4",
      title: "Custom T-Shirt Design",
      price: "$15",
      originalPrice: null,
      rating: 4.6,
      reviews: 67,
      seller: "DesignHub",
      image: "/api/placeholder/400/400",
      category: "Fashion",
      description: "Custom designed t-shirt with unique artwork. High quality cotton material.",
      features: ["100% cotton", "Custom design", "Multiple sizes", "Machine washable"],
      isHot: true
    }
  ];
  
  return items.find(item => item.id === id);
};

const ItemPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const item = getItemById(id || "");

  if (!item) {
    return (
      <Layout title="Item Not Found">
        <div className="min-h-screen p-6 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-foreground mb-4">Item Not Found</h1>
            <Button onClick={() => navigate('/marketplace')}>
              Back to Marketplace
            </Button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title={item.title}>
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--marketplace-bg)' }}
      >
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Back Button */}
          <Button 
            variant="outline" 
            onClick={() => navigate('/marketplace')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Marketplace
          </Button>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Image Section */}
            <div className="space-y-4">
              <div className="relative">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="w-full h-96 object-cover rounded-lg shadow-medium"
                />
                {item.isHot && (
                  <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                    🔥 Hot
                  </Badge>
                )}
                <Button 
                  size="icon" 
                  variant="ghost" 
                  className="absolute top-4 right-4 bg-white/80 hover:bg-white"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Details Section */}
            <div className="space-y-6">
              <div>
                <Badge variant="outline" className="mb-2">{item.category}</Badge>
                <h1 className="text-3xl font-bold text-foreground mb-2">{item.title}</h1>
                
                <div className="flex items-center gap-1 mb-4">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{item.rating}</span>
                  <span className="text-muted-foreground">({item.reviews} reviews)</span>
                </div>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl font-bold text-green-600">{item.price}</span>
                  {item.originalPrice && (
                    <span className="text-xl text-red-500 line-through">{item.originalPrice}</span>
                  )}
                </div>

                <p className="text-muted-foreground mb-2">Sold by {item.seller}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Description</h3>
                <p className="text-foreground/80">{item.description}</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-foreground">Features</h3>
                <ul className="space-y-2">
                  {item.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-2 text-foreground/80">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-3 pt-4">
                <Button 
                  className="flex-1 bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                  onClick={() => navigate(`/marketplace/checkout/${item.id}?from=item`)}
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Buy Now
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => navigate(`/marketplace/share/${item.id}`)}
                >
                  <Share2 className="w-4 h-4" />
                </Button>
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={() => navigate(`/marketplace/message/${item.seller}`)}
                >
                  <MessageCircle className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Information */}
          <Card className="shadow-soft">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold text-foreground mb-4">Seller Information</h3>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center text-white font-bold">
                  {item.seller[0]}
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{item.seller}</h4>
                  <p className="text-muted-foreground">Verified Seller</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default ItemPage;