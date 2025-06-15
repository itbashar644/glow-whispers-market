import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import type { Product } from "@/pages/Index";

interface CartItem {
  product: Product;
  quantity: number;
}

interface ContactInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  comment: string;
}

const Cart = () => {
  const { toast } = useToast();
  
  // Mock user profile data - в реальном приложении это будет из контекста
  const userProfile = {
    firstName: "Анна",
    lastName: "Иванова", 
    email: "anna@example.com",
    phone: "+7 (999) 123-45-67",
    address: "г. Москва, ул. Примерная, д. 10, кв. 25"
  };

  // Contact form state - автоматически заполняется данными пользователя
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: userProfile.firstName || "",
    lastName: userProfile.lastName || "",
    email: userProfile.email || "",
    phone: userProfile.phone || "",
    address: userProfile.address || "",
    comment: ""
  });

  // Mock cart items - в реальном приложении это будет из контекста/состояния
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      product: {
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
      quantity: 2
    },
    {
      product: {
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
      quantity: 1
    }
  ]);

  const updateQuantity = (productId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(productId);
      return;
    }

    setCartItems(prev => 
      prev.map(item => 
        item.product.id === productId 
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  const removeItem = (productId: number) => {
    setCartItems(prev => prev.filter(item => item.product.id !== productId));
    toast({
      title: "Товар удален из корзины",
      description: "Товар успешно удален из вашей корзины",
    });
  };

  const clearCart = () => {
    setCartItems([]);
    toast({
      title: "Корзина очищена",
      description: "Все товары удалены из корзины",
    });
  };

  const handleContactChange = (field: keyof ContactInfo, value: string) => {
    setContactInfo(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmitOrder = () => {
    // Проверяем обязательные поля
    if (!contactInfo.firstName || !contactInfo.lastName || !contactInfo.email || !contactInfo.phone || !contactInfo.address) {
      toast({
        title: "Заполните все поля",
        description: "Пожалуйста, заполните все обязательные поля для оформления заказа",
        variant: "destructive"
      });
      return;
    }

    toast({
      title: "Заказ оформлен!",
      description: "Мы свяжемся с вами в ближайшее время для подтверждения заказа",
    });

    // В реальном приложении здесь будет отправка заказа на сервер
    console.log("Order submitted:", { items: cartItems, contact: contactInfo, total: totalPrice });
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const totalDiscount = cartItems.reduce((sum, item) => {
    if (item.product.originalPrice) {
      return sum + ((item.product.originalPrice - item.product.price) * item.quantity);
    }
    return sum;
  }, 0);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-warm-gradient">
        <Header cartItemsCount={0} />
        
        <div className="container mx-auto px-4 py-20">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
            <h1 className="text-3xl font-playfair font-bold text-primary mb-4">
              Ваша корзина пуста
            </h1>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              Добавьте товары в корзину, чтобы продолжить покупки
            </p>
            <Link to="/catalog">
              <Button size="lg">
                Перейти к покупкам
              </Button>
            </Link>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={totalItems} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
            Корзина
          </h1>
          <p className="text-muted-foreground">
            {totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'} в корзине
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <Card>
              <CardHeader>
                <CardTitle>Товары в корзине</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.product.id} className="flex gap-4 p-4 border rounded-lg">
                    <img 
                      src={item.product.image} 
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-primary truncate">
                          {item.product.name}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeItem(item.product.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-2">
                        {item.product.scent}
                      </p>
                      
                      <Badge variant="outline" className="mb-3">
                        {item.product.category}
                      </Badge>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <span className="w-8 text-center font-medium">
                            {item.quantity}
                          </span>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="text-right">
                          <div className="font-bold text-primary">
                            {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
                          </div>
                          {item.product.originalPrice && (
                            <div className="text-sm text-muted-foreground line-through">
                              {(item.product.originalPrice * item.quantity).toLocaleString('ru-RU')} ₽
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                <div className="flex justify-between items-center pt-4">
                  <Button variant="outline" onClick={clearCart}>
                    Очистить корзину
                  </Button>
                  
                  <Link to="/catalog">
                    <Button variant="ghost">
                      Продолжить покупки
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* Contact Information */}
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">Имя *</Label>
                    <Input
                      id="firstName"
                      value={contactInfo.firstName}
                      onChange={(e) => handleContactChange('firstName', e.target.value)}
                      placeholder="Введите имя"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Фамилия *</Label>
                    <Input
                      id="lastName"
                      value={contactInfo.lastName}
                      onChange={(e) => handleContactChange('lastName', e.target.value)}
                      placeholder="Введите фамилию"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={contactInfo.email}
                    onChange={(e) => handleContactChange('email', e.target.value)}
                    placeholder="Введите email"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    value={contactInfo.phone}
                    onChange={(e) => handleContactChange('phone', e.target.value)}
                    placeholder="Введите номер телефона"
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="address">Адрес доставки *</Label>
                  <Textarea
                    id="address"
                    value={contactInfo.address}
                    onChange={(e) => handleContactChange('address', e.target.value)}
                    placeholder="Введите полный адрес доставки"
                    rows={3}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="comment">Комментарий к заказу</Label>
                  <Textarea
                    id="comment"
                    value={contactInfo.comment}
                    onChange={(e) => handleContactChange('comment', e.target.value)}
                    placeholder="Дополнительные пожелания или комментарии"
                    rows={3}
                  />
                </div>
                
                <p className="text-sm text-muted-foreground">
                  * Обязательные поля для заполнения
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Итого</h3>
                
                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span>Товары ({totalItems})</span>
                    <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                  </div>
                  
                  {totalDiscount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Скидка</span>
                      <span>-{totalDiscount.toLocaleString('ru-RU')} ₽</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between">
                    <span>Доставка</span>
                    <span className="text-green-600">Бесплатно</span>
                  </div>
                </div>
                
                <Separator className="my-4" />
                
                <div className="flex justify-between text-lg font-bold mb-6">
                  <span>К оплате</span>
                  <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
                </div>
                
                <Button className="w-full mb-3" onClick={handleSubmitOrder}>
                  Оформить заказ
                </Button>
                
                <div className="text-xs text-muted-foreground text-center">
                  Нажимая "Оформить заказ", вы соглашаетесь с условиями доставки и возврата
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
