
import { Link } from "react-router-dom";

export const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-candle-gradient rounded-full flex items-center justify-center shrink-0">
              <div className="w-3 h-4 bg-candle-flame rounded-full candle-flame"></div>
            </div>
            <p className="text-primary-foreground/80 text-sm whitespace-nowrap">
              © 2020-2025 Prototype Shop
            </p>
          </div>
          
          <nav className="flex flex-wrap justify-center gap-x-4 lg:gap-x-6 gap-y-2 text-sm">
            <Link to="/catalog" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Каталог
            </Link>
            <Link to="/about" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              О нас
            </Link>
            <Link to="/shipping" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Доставка
            </Link>
            <Link to="/candle-care" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Уход за свечами
            </Link>
            <Link to="/contact" className="text-primary-foreground/80 hover:text-primary-foreground transition-colors">
              Контакты
            </Link>
            <Link to="/privacy" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Политика конфиденциальности
            </Link>
            <Link to="/terms" className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              Условия пользования
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};
