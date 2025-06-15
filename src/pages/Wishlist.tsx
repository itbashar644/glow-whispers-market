
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, ShoppingCart } from "lucide-react";
import { useWishlist } from "@/contexts/WishlistContext";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import type { Product } from "@/pages/Index";

const Wishlist = () => {
  const { wishlist, toggleWishlist } = useWishlist();
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<number[]>([]);

  // All products data for wishlist display
  const allProducts: Product[] = [
    {
      id: 1,
      name: "Лавандовые Сны",
      price: 2800,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1602874801006-2b21dc4fcc48?w=400&h=500&fit=crop",
      category: "Ароматические",
      rating: 4.8,
      reviews: 124,
      scent: "Лаванда и ваниль",
      burnTime: "45-50 часов",
      description: "Успокаивающая свеча с натуральной лавандой для идеального расслабления.",
      isOnSale: true
    },
    {
      id: 2,
      name: "Цитрусовая Свежесть",
      price: 3100,
      image: "https://images.unsplash.com/photo-1615887023516-0e3d60982f11?w=400&h=500&fit=crop",
      category: "Цитрусовые",
      rating: 4.9,
      reviews: 89,
      scent: "Лимон и грейпфрут",
      burnTime: "40-45 часов",
      description: "Бодрящий аромат цитрусовых для энергии и хорошего настроения.",
      isNew: true
    },
    {
      id: 3,
      name: "Древесные Нотки",
      price: 3500,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=500&fit=crop",
      category: "Древесные",
      rating: 4.7,
      reviews: 156,
      scent: "Сандал и кедр",
      burnTime: "50-55 часов",
      description: "Теплый древесный аромат создает атмосферу уюта и комфорта.",
      isNew: true
    },
    {
      id: 4,
      name: "Морской Бриз",
      price: 2900,
      image: "https://images.unsplash.com/photo-1544705259-d3d395b8bdc3?w=400&h=500&fit=crop",
      category: "Свежие",
      rating: 4.6,
      reviews: 67,
      scent: "Морская соль",
      burnTime: "42-48 часов",
      description: "Освежающий аромат океана для создания летнего настроения."
    },
    {
      id: 5,
      name: "Розовый Сад",
      price: 3300,
      originalPrice: 3800,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      category: "Цветочные",
      rating: 4.9,
      reviews: 203,
      scent: "Роза и пион",
      burnTime: "48-52 часов",
      description: "Нежный цветочный аромат для романтической атмосферы.",
      isOnSale: true
    },
    {
      id: 6,
      name: "Пряные Специи",
      price: 2700,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=500&fit=crop",
      category: "Пряные",
      rating: 4.5,
      reviews: 92,
      scent: "Корица и гвоздика",
      burnTime: "38-44 часов",
      description: "Согревающий пряный аромат для холодных вечеров."
    }
  ];

  const wishlistProducts = allProducts.filter(product => wishlist.includes(product.id));

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    toast({
      title: "Товар добавлен в корзину",
      description: "Перейдите в корзину для оформления заказа",
    });
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={cartItems.length} products={allProducts} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
            Избранное
          </h1>
          <p className="text-muted-foreground">
            Ваши любимые товары в одном месте
          </p>
        </div>

        {wishlistProducts.length === 0 ? (
          <div className="text-center py-16">
            <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-4">Список желаний пуст</h2>
            <p className="text-muted-foreground mb-8">
              Добавьте товары в избранное, чтобы они появились здесь
            </p>
            <Button asChild>
              <a href="/catalog">Перейти к каталогу</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <Card key={product.id} className="overflow-hidden group hover:shadow-lg transition-shadow">
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform group-hover:scale-105"
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                    onClick={() => toggleWishlist(product.id)}
                  >
                    <Heart className="h-4 w-4 fill-red-500 text-red-500" />
                  </Button>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-playfair font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.description}</p>
                  <div className="text-sm text-muted-foreground mb-3">
                    🌸 Аромат: {product.scent}
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-primary">{product.price} ₽</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          {product.originalPrice} ₽
                        </span>
                      )}
                    </div>
                    <Button size="sm" onClick={() => addToCart(product.id)}>
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      В корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Wishlist;
