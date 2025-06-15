
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import type { Product } from "@/pages/Index";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { ContactForm } from "@/components/cart/ContactForm";
import { EmptyCart } from "@/components/cart/EmptyCart";

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
          <EmptyCart />
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={totalItems} />
      
      <div className="container mx-auto px-4 py-8">
        <CartHeader totalItems={totalItems} />

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
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemoveItem={removeItem}
                  />
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
            <ContactForm
              contactInfo={contactInfo}
              onContactChange={handleContactChange}
            />
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <CartSummary
              totalItems={totalItems}
              totalPrice={totalPrice}
              totalDiscount={totalDiscount}
              onSubmitOrder={handleSubmitOrder}
            />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
