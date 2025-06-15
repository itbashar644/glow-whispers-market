
import { ShoppingCart, Heart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/pages/Index";

interface ProductGridProps {
  products: Product[];
  onAddToCart: (product: Product) => void;
}

export const ProductGrid = ({ products, onAddToCart }: ProductGridProps) => {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Card 
              key={product.id} 
              className="group hover:shadow-xl transition-all duration-300 overflow-hidden border-0 bg-white/80 backdrop-blur-sm"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Badges */}
                  <div className="absolute top-3 left-3 flex flex-col gap-2">
                    {product.isNew && (
                      <Badge className="bg-candle-flame text-white">Новинка</Badge>
                    )}
                    {product.isOnSale && (
                      <Badge variant="destructive">Скидка</Badge>
                    )}
                  </div>

                  {/* Wishlist button with higher z-index */}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-3 right-3 bg-white/90 hover:bg-white transition-colors z-20"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart 
                      className={`h-4 w-4 ${
                        wishlist.includes(product.id) 
                          ? 'fill-red-500 text-red-500' 
                          : 'text-gray-600'
                      }`} 
                    />
                  </Button>

                  {/* Quick add to cart on hover with lower z-index */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-10">
                    <Button
                      onClick={() => onAddToCart(product)}
                      className="bg-white text-primary hover:bg-warm-100 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300"
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      В корзину
                    </Button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                  </div>

                  <h3 className="text-xl font-playfair font-semibold text-primary mb-2">
                    {product.name}
                  </h3>
                  
                  <p className="text-sm text-muted-foreground mb-3">
                    {product.description}
                  </p>

                  <div className="space-y-1 mb-4 text-sm text-muted-foreground">
                    <div>🌸 Аромат: {product.scent}</div>
                    <div>⏱️ Время горения: {product.burnTime}</div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-primary">
                        {product.price.toLocaleString('ru-RU')} ₽
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice.toLocaleString('ru-RU')} ₽
                        </span>
                      )}
                    </div>
                    
                    <Button
                      onClick={() => onAddToCart(product)}
                      size="sm"
                      variant="outline"
                      className="shrink-0"
                    >
                      <ShoppingCart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
