
import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeaderProps {
  cartItemsCount: number;
}

export const Header = ({ cartItemsCount }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-candle-gradient rounded-full flex items-center justify-center">
              <div className="w-3 h-4 bg-candle-flame rounded-full candle-flame"></div>
            </div>
            <h1 className="text-2xl font-playfair font-bold text-primary">
              Prototype-X.Shop
            </h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Каталог
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Коллекции
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              О нас
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors">
              Контакты
            </a>
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Search className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {cartItemsCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemsCount}
                </Badge>
              )}
            </Button>

            {/* Mobile menu button */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-warm-200 pt-4">
            <div className="flex flex-col space-y-4">
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Каталог
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Коллекции
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                О нас
              </a>
              <a href="#" className="text-foreground hover:text-primary transition-colors">
                Контакты
              </a>
              <div className="pt-4 border-t border-warm-200">
                <Button variant="outline" className="w-full">
                  <Search className="h-4 w-4 mr-2" />
                  Поиск
                </Button>
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
};
