
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { User, Package, Heart, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/pages/Index";

const Profile = () => {
  const { toast } = useToast();
  const [userInfo, setUserInfo] = useState({
    firstName: "Анна",
    lastName: "Иванова",
    email: "anna@example.com",
    phone: "+7 (999) 123-45-67",
    address: "г. Москва, ул. Примерная, д. 10, кв. 25"
  });

  const [orders] = useState([
    {
      id: "ORD-001",
      date: "2024-01-15",
      status: "Доставлен",
      total: 8500,
      items: [
        { name: "Лавандовые Сны", price: 2800, quantity: 2 },
        { name: "Цитрусовая Свежесть", price: 3100, quantity: 1 }
      ]
    },
    {
      id: "ORD-002", 
      date: "2024-01-20",
      status: "В пути",
      total: 6400,
      items: [
        { name: "Древесные Нотки", price: 3500, quantity: 1 },
        { name: "Морской Бриз", price: 2900, quantity: 1 }
      ]
    }
  ]);

  const [wishlist] = useState<Product[]>([
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
    }
  ]);

  const handleSaveProfile = () => {
    toast({
      title: "Профиль обновлен",
      description: "Ваши данные успешно сохранены",
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

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={0} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
            Личный кабинет
          </h1>
          <p className="text-muted-foreground">
            Управляйте своим профилем и заказами
          </p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Профиль
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center gap-2">
              <Package className="h-4 w-4" />
              Заказы
            </TabsTrigger>
            <TabsTrigger value="wishlist" className="flex items-center gap-2">
              <Heart className="h-4 w-4" />
              Избранное
            </TabsTrigger>
            <TabsTrigger value="settings" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Настройки
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Личная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя</Label>
                    <Input
                      id="firstName"
                      value={userInfo.firstName}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, firstName: e.target.value }))}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия</Label>
                    <Input
                      id="lastName"
                      value={userInfo.lastName}
                      onChange={(e) => setUserInfo(prev => ({ ...prev, lastName: e.target.value }))}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={userInfo.email}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон</Label>
                  <Input
                    id="phone"
                    value={userInfo.phone}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес</Label>
                  <Input
                    id="address"
                    value={userInfo.address}
                    onChange={(e) => setUserInfo(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                
                <Button onClick={handleSaveProfile} className="w-full md:w-auto">
                  Сохранить изменения
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
                          {new Date(order.date).toLocaleDateString('ru-RU')}
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((product) => (
                <Card key={product.id} className="overflow-hidden">
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
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
                      <Button size="sm">В корзину</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
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
