import { Layout } from "@/components/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart, ShoppingCart, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

const hotPicks = [
  {
    id: 1,
    title: "Handcrafted Pottery Set",
    price: "$45",
    rating: 4.8,
    reviews: 23,
    seller: "ArtisanCrafts",
    image: "/api/placeholder/200/200",
    isHot: true,
    category: "Art & Crafts"
  },
  {
    id: 2,
    title: "Vintage Camera Collection",
    price: "$120",
    rating: 4.9,
    reviews: 12,
    seller: "RetroTech",
    image: "/api/placeholder/200/200",
    isHot: true,
    category: "Electronics"
  },
  {
    id: 3,
    title: "Organic Herb Garden Kit",
    price: "$28",
    rating: 4.7,
    reviews: 45,
    seller: "GreenThumb",
    image: "/api/placeholder/200/200",
    isHot: false,
    category: "Garden"
  },
  {
    id: 4,
    title: "Custom T-Shirt Design",
    price: "$15",
    rating: 4.6,
    reviews: 67,
    seller: "DesignHub",
    image: "/api/placeholder/200/200",
    isHot: true,
    category: "Fashion"
  }
];

const recommendedItems = [
  {
    id: 5,
    title: "Wooden Coffee Table",
    price: "$89",
    rating: 4.5,
    reviews: 18,
    seller: "FurnitureCraft",
    image: "/api/placeholder/200/200",
    category: "Home & Garden"
  },
  {
    id: 6,
    title: "Bluetooth Wireless Speaker",
    price: "$65",
    rating: 4.7,
    reviews: 34,
    seller: "TechSound",
    image: "/api/placeholder/200/200",
    category: "Electronics"
  },
  {
    id: 7,
    title: "Yoga Mat Premium",
    price: "$32",
    rating: 4.8,
    reviews: 56,
    seller: "FitLife",
    image: "/api/placeholder/200/200",
    category: "Sports & Fitness"
  },
  {
    id: 8,
    title: "Artisan Leather Wallet",
    price: "$42",
    rating: 4.6,
    reviews: 29,
    seller: "LeatherWorks",
    image: "/api/placeholder/200/200",
    category: "Fashion"
  },
  {
    id: 9,
    title: "Essential Oil Diffuser",
    price: "$38",
    rating: 4.4,
    reviews: 22,
    seller: "AromaZen",
    image: "/api/placeholder/200/200",
    category: "Health & Beauty"
  },
  {
    id: 10,
    title: "Children's Building Blocks",
    price: "$24",
    rating: 4.9,
    reviews: 41,
    seller: "PlayTime",
    image: "/api/placeholder/200/200",
    category: "Toys & Games"
  }
];

const Marketplace = () => {
  const navigate = useNavigate();
  return (
    <Layout title="Marketplace">
      <div 
        className="min-h-screen p-6"
        style={{ background: 'var(--marketplace-bg)' }}
      >
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold text-foreground">Marketplace</h1>
            <Button 
              className="bg-gradient-to-br from-green-400 to-emerald-500 text-white"
              onClick={() => navigate('/marketplace/sell')}
            >
              Sell Item
            </Button>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-5 h-5 text-primary" />
            <h2 className="text-2xl font-semibold text-foreground">Hot Picks</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {hotPicks.map((item) => (
              <Card 
                key={item.id} 
                className="shadow-soft hover:shadow-medium transition-smooth group cursor-pointer"
                onClick={() => navigate(`/marketplace/item/${item.id}`)}
              >
                <CardContent className="p-0">
                  <div className="relative">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-48 object-cover rounded-t-lg"
                    />
                    {item.isHot && (
                      <Badge className="absolute top-2 left-2 bg-red-500 text-white">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Hot
                      </Badge>
                    )}
                    <Button 
                      size="icon" 
                      variant="ghost" 
                      className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="outline" className="text-xs">{item.category}</Badge>
                    </div>
                    
                    <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                      {item.title}
                    </h3>
                    
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{item.rating}</span>
                      <span className="text-sm text-muted-foreground">({item.reviews})</span>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">by {item.seller}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold text-green-600">{item.price}</span>
                      <Button 
                        size="sm" 
                        className="bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/marketplace/checkout/${item.id}?from=marketplace`);
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-1" />
                        Buy
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Recommended Items Section */}
          <div className="mt-12">
            <div className="flex items-center gap-2 mb-6">
              <Star className="w-5 h-5 text-orange-500" />
              <h2 className="text-2xl font-semibold text-foreground">Recommended for You</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendedItems.map((item) => (
                <Card 
                  key={item.id} 
                  className="shadow-soft hover:shadow-medium transition-smooth group cursor-pointer"
                  onClick={() => navigate(`/marketplace/item/${item.id}`)}
                >
                  <CardContent className="p-0">
                    <div className="relative">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-48 object-cover rounded-t-lg"
                      />
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="absolute top-2 right-2 bg-white/80 hover:bg-white"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Heart className="w-4 h-4" />
                      </Button>
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="text-xs">{item.category}</Badge>
                      </div>
                      
                      <h3 className="font-semibold text-foreground mb-2 line-clamp-2">
                        {item.title}
                      </h3>
                      
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                        <span className="text-sm text-muted-foreground">({item.reviews})</span>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-3">by {item.seller}</p>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-600">{item.price}</span>
                        <Button 
                          size="sm" 
                          className="bg-gradient-to-br from-green-400 to-emerald-500 text-white"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/marketplace/checkout/${item.id}?from=marketplace`);
                          }}
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Buy
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="text-2xl font-semibold text-foreground mb-6">Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {[
                "Art & Crafts", "Electronics", "Fashion", "Home & Garden", 
                "Books & Media", "Sports & Fitness", "Health & Beauty", "Toys & Games",
                "Automotive", "Food & Beverages", "Jewelry & Accessories", "Musical Instruments",
                "Office Supplies", "Pet Supplies", "Baby & Kids", "Collectibles"
              ].map((category) => (
                <Card key={category} className="shadow-soft hover:shadow-medium transition-smooth cursor-pointer">
                  <CardContent className="p-4 text-center">
                    <h3 className="font-medium text-foreground">{category}</h3>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Marketplace;