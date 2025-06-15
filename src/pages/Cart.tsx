import { useState, useEffect } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { CartHeader } from "@/components/cart/CartHeader";
import { CartItem } from "@/components/cart/CartItem";
import { CartSummary } from "@/components/cart/CartSummary";
import { ContactForm } from "@/components/cart/ContactForm";
import { EmptyCart } from "@/components/cart/EmptyCart";
import { useAuth } from "@/contexts/AuthContext";
import { useCart } from "@/contexts/CartContext";

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
  const { user, profile } = useAuth();
  const {
    cartItems,
    updateQuantity,
    removeItem,
    clearCart,
    totalItems,
  } = useCart();

  // Contact form state
  const [contactInfo, setContactInfo] = useState<ContactInfo>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    comment: ""
  });
  
  useEffect(() => {
    if (profile) {
      const nameParts = (profile.name || '').split(' ');
      setContactInfo(prev => ({
        ...prev,
        firstName: nameParts[0] || '',
        lastName: nameParts.slice(1).join(' ') || '',
        email: user?.email || '',
        phone: profile.phone || '',
        address: profile.address || '',
      }));
    } else if(user) {
        setContactInfo(prev => ({ ...prev, email: user.email || ''}));
    }
  }, [user, profile]);

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
    clearCart();
  };

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
      
      <div className="container mx-auto px-4 py-20">
        <CartHeader totalItems={totalItems} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {/* Products */}
            <div>
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
                  
                  <div className="flex justify-start pt-4">
                    <Button variant="outline" onClick={clearCart}>
                      Очистить корзину
                    </Button>
                  </div>
                </CardContent>
              </Card>
              <div className="flex justify-end mt-4">
                  <Button asChild>
                      <Link to="/catalog">Продолжить покупки</Link>
                  </Button>
              </div>
            </div>

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
