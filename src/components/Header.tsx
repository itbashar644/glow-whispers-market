
import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, X, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SearchDialog } from "@/components/SearchDialog";
import type { Product } from "@/pages/Index";

interface HeaderProps {
  cartItemsCount: number;
  products?: Product[];
}

export const Header = ({ cartItemsCount, products = [] }: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-warm-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/a48c1ffb-1043-45c5-8b02-d51cec2d23f2.png" 
                alt="Prototype Candle" 
                className="h-12 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              <Link to="/catalog" className="text-foreground hover:text-primary transition-colors">
                Каталог
              </Link>
              <Link to="/collections" className="text-foreground hover:text-primary transition-colors">
                Коллекции
              </Link>
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                О нас
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center space-x-4">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-5 w-5" />
              </Button>
              
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
              
              <Link to="/cart">
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
              </Link>

              <Link to="/profile">
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                </Button>
              </Link>

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
                <Link 
                  to="/catalog" 
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Каталог
                </Link>
                <Link 
                  to="/collections" 
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Коллекции
                </Link>
                <Link 
                  to="/about" 
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  О нас
                </Link>
                <Link 
                  to="/contact" 
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Контакты
                </Link>
                <Link 
                  to="/profile" 
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Личный кабинет
                </Link>
                <Link 
                  to="/cart" 
                  className="text-foreground hover:text-primary transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Корзина ({cartItemsCount})
                </Link>
                <div className="pt-4 border-t border-warm-200">
                  <Button 
                    variant="outline" 
                    className="w-full"
                    onClick={() => {
                      setIsSearchOpen(true);
                      setIsMenuOpen(false);
                    }}
                  >
                    <Search className="h-4 w-4 mr-2" />
                    Поиск
                  </Button>
                </div>
              </div>
            </nav>
          )}
        </div>
      </header>

      <SearchDialog 
        open={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        products={products}
      />
    </>
  );
};
