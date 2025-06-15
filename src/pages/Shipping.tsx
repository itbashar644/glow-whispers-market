
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Truck, Shield, Clock } from "lucide-react";

const Shipping = () => {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Header cartItemsCount={0} />
      
      <main className="flex-grow container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-8 text-center">
            Доставка
          </h1>
          
          <div className="mb-12">
            {/* Доставка */}
            <div className="bg-white rounded-lg p-6 shadow-sm border max-w-2xl mx-auto">
              <div className="flex items-center mb-4">
                <Truck className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-semibold">Условия доставки</h2>
              </div>
              
              <div className="space-y-4 text-muted-foreground">
                <div>
                  <h3 className="font-medium text-foreground mb-2">Бесплатная доставка</h3>
                  <p>При заказе от 3000 ₽ доставка бесплатная по всей России</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Стандартная доставка</h3>
                  <p>450 ₽ - доставка курьером по Санкт-Петербургу (1-2 дня)</p>
                  <p>450 ₽ - доставка по России почтой (3-7 дней)</p>
                </div>
                
                <div>
                  <h3 className="font-medium text-foreground mb-2">Экспресс доставка</h3>
                  <p>750 ₽ - доставка в день заказа по Санкт-Петербургу</p>
                </div>
              </div>
            </div>
          </div>

          {/* Дополнительная информация */}
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-warm-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Shield className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Гарантия качества</h3>
              </div>
              <p className="text-muted-foreground">
                Мы гарантируем высокое качество наших свечей. Все изделия проходят 
                контроль качества перед отправкой.
              </p>
            </div>

            <div className="bg-warm-50 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary mr-3" />
                <h3 className="text-lg font-semibold">Время обработки</h3>
              </div>
              <p className="text-muted-foreground">
                Заказы обрабатываются в течение 1-2 рабочих дней. 
                При заказе до 14:00 - отправка в тот же день.
              </p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground mb-4">
              Остались вопросы? Свяжитесь с нами любым удобным способом
            </p>
            <div className="flex justify-center space-x-6 text-sm">
              <span>📧 info@prototypecandle.ru</span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Shipping;
