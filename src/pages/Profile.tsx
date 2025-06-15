import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Package, Heart, Settings, ShoppingCart, LogOut } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/pages/Index";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "react-router-dom";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: { name: string; price: number; quantity: number }[];
};

const Profile = () => {
  const { toast } = useToast();
  const { wishlist, toggleWishlist } = useWishlist();
  const { user, profile, signOut, loading, setProfile } = useAuth();
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<number[]>([]);

  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  });

  const [orders, setOrders] = useState<Order[]>([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (user && profile) {
      setUserInfo({
        name: profile.name || "",
        email: user.email || "",
        phone: profile.phone || "",
        address: profile.address || "",
      });
    } else if (user) {
      setUserInfo(prev => ({ ...prev, email: user.email || '' }));
    }

    if (user) {
      supabase
        .from('orders')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .then(({ data }) => {
          if (data) {
            setOrders(data as any);
          }
        });
    }
  }, [user, profile]);

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

  const handleSaveProfile = async () => {
    if (!user) return;
    setIsSaving(true);
    const { data, error } = await supabase
      .from('profiles')
      .update({
        name: userInfo.name,
        phone: userInfo.phone,
        address: userInfo.address,
      })
      .eq('id', user.id)
      .select()
      .single();

    if (error) {
      toast({ title: "Ошибка", description: error.message, variant: "destructive" });
    } else {
      setProfile(data);
      toast({ title: "Профиль обновлен", description: "Ваши данные успешно сохранены" });
    }
    setIsSaving(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    toast({
      title: "Товар добавлен в корзину",
      description: "Перейдите в корзину для оформления заказа",
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Доставлен":
        return "bg-green-100 text-green-800";
      case "В пути":
        return "bg-blue-100 text-blue-800";
      case "Обрабатывается":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-warm-gradient">
        <Header cartItemsCount={0} />
        <div className="container mx-auto px-4 py-8">
          <Skeleton className="h-12 w-1/2 mb-8" />
          <div className="grid grid-cols-4 gap-2 mb-6">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
          <Card>
            <CardHeader><Skeleton className="h-8 w-1/4" /></CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-16 w-full" />
              <Skeleton className="h-10 w-32" />
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={cartItems.length} products={allProducts} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
              Личный кабинет
            </h1>
            <p className="text-muted-foreground">
              Добро пожаловать, {userInfo.name || 'Гость'}!
            </p>
          </div>
          <Button variant="outline" onClick={handleSignOut}>
            <LogOut className="h-4 w-4 mr-2" />
            Выйти
          </Button>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2"><User className="h-4 w-4" />Профиль</TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2"><Package className="h-4 w-4" />Заказы</TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2"><Heart className="h-4 w-4" />Избранное</TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2"><Settings className="h-4 w-4" />Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader><CardTitle>Личная информация</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Имя</Label>
                    <Input id="name" value={userInfo.name} onChange={(e) => setUserInfo(prev => ({ ...prev, name: e.target.value }))} />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={userInfo.email} disabled />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input id="phone" value={userInfo.phone} onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input id="address" value={userInfo.address} onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))} />
                </div>
                <Button onClick={handleSaveProfile} disabled={isSaving} className="w-full md:w-auto">
                  {isSaving ? 'Сохранение...' : 'Сохранить изменения'}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="orders">
            <div className="space-y-4">
              {orders.map((order) => (
                <Card key={order.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">Заказ {order.id}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {new Date(order.created_at).toLocaleDateString('ru-RU')}
                        </p>
                      </div>
                      <Badge className={getStatusColor(order.status)}>
                        {order.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {order.items.map((item, index) => (
                        <div key={index} className="flex justify-between">
                          <span>{item.name} × {item.quantity}</span>
                          <span>{item.price * item.quantity} ₽</span>
                        </div>
                      ))}
                      <Separator />
                      <div className="flex justify-between font-semibold">
                        <span>Итого:</span>
                        <span>{order.total} ₽</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="wishlist">
            {wishlistProducts.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-16">
                  <Heart className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Список желаний пуст</h3>
                  <p className="text-muted-foreground text-center mb-4">
                    Добавьте товары в избранное, чтобы они появились здесь
                  </p>
                  <Button asChild>
                    <a href="/catalog">Перейти к каталогу</a>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {wishlistProducts.map((product) => (
                  <Card key={product.id} className="overflow-hidden">
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute top-2 right-2 bg-white/90 hover:bg-white"
                        onClick={() => toggleWishlist(product.id)}
                      >
                        <Heart className="h-4 w-4 text-primary fill-primary" />
                      </Button>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{product.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">{product.scent}</p>
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-lg">{product.price} ₽</span>
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
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>Настройки уведомлений</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email уведомления</h4>
                    <p className="text-sm text-muted-foreground">
                      Получать уведомления о статусе заказов
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Включено
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">SMS уведомления</h4>
                    <p className="text-sm text-muted-foreground">
                      Получать SMS о доставке заказов
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Отключено
                  </Button>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Рекламные рассылки</h4>
                    <p className="text-sm text-muted-foreground">
                      Получать информацию о скидках и новинках
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Включено
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Profile;
