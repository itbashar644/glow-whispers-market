import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

export const Hero = () => {
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-warm-50 via-candle-cream to-warm-100"></div>
      <div className="absolute top-20 left-10 w-32 h-32 bg-candle-flame/10 rounded-full blur-xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-warm-300/20 rounded-full blur-xl"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
            ✨ У нас новая коллекция
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-playfair font-bold text-primary mb-6 leading-tight">
            Создайте
            <span className="text-candle-flame"> магию </span>
            в вашем доме
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
            Откройте для себя коллекцию премиальных свечей ручной работы. 
            Каждая свеча создана с любовью и вниманием к деталям для создания 
            неповторимой атмосферы уюта и тепла.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="px-8 py-6 text-lg font-medium bg-primary hover:bg-primary/90">
              <Link to="/catalog">Смотреть каталог</Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="px-8 py-6 text-lg">
              <Link to="/about">Узнать больше</Link>
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-playfair font-bold text-primary mb-2">100%</div>
              <div className="text-muted-foreground">Натуральный воск</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-playfair font-bold text-primary mb-2">40+</div>
              <div className="text-muted-foreground">Часов горения</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-playfair font-bold text-primary mb-2">24/7</div>
              <div className="text-muted-foreground">Поддержка клиентов</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
