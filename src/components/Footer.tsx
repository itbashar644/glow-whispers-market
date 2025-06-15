
import { Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-candle-gradient rounded-full flex items-center justify-center">
                <div className="w-3 h-4 bg-candle-flame rounded-full candle-flame"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold">Prototype Shop</h3>
            </div>
            <p className="text-primary-foreground/80 leading-relaxed">
              Премиальные свечи ручной работы для создания особой атмосферы в вашем доме. 
              Качество, проверенное временем.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Быстрые ссылки</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/catalog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Каталог
              </Link>
              <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                О нас
              </Link>
            </nav>
          </div>

          {/* Customer Service */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Поддержка</h4>
            <nav className="flex flex-col space-y-2">
              <Link to="/shipping" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Доставка
              </Link>
              <Link to="/candle-care" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Уход за свечами
              </Link>
              <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
                Контакты
              </Link>
            </nav>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-primary-foreground/60 text-sm">
              © 2020-2025 Prototype Shop. Все права защищены.
            </p>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Политика конфиденциальности
              </a>
              <a href="#" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
                Условия использования
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
