
import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SearchDialog } from "@/components/SearchDialog";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/pages/Index";
import { useAuth } from "@/contexts/AuthContext";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";

interface HeaderProps {
  cartItemsCount: number;
  products?: Product[];
}

export const Header = ({ cartItemsCount, products = [] }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlist } = useWishlist();
  const { session } = useAuth();

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
              <Link to="/about" className="text-foreground hover:text-primary transition-colors">
                О нас
              </Link>
              <Link to="/contact" className="text-foreground hover:text-primary transition-colors">
                Контакты
              </Link>
            </nav>

            {/* Actions */}
            <div className="flex items-center md:space-x-3 space-x-2">
              <Button 
                variant="ghost" 
                size="icon" 
                className="hidden md:flex"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="h-6 w-6" />
              </Button>
              
              <Link to="/wishlist">
                <Button variant="ghost" size="icon" className="relative">
                  <Heart className="h-6 w-6" />
                  {wishlist.length > 0 && (
                    <Badge 
                      variant="cinnamon" 
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs min-w-4 rounded-full"
                    >
                      {wishlist.length > 9 ? '9+' : wishlist.length}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
                  {cartItemsCount > 0 && (
                    <Badge 
                      variant="cinnamon" 
                      className="absolute -top-1 -right-1 h-4 w-4 flex items-center justify-center p-0 text-xs min-w-4 rounded-full"
                    >
                      {cartItemsCount > 9 ? '9+' : cartItemsCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              <Link to={session ? "/profile" : "/auth"}>
                <Button variant="ghost" size="icon">
                  <User className="h-6 w-6" />
                </Button>
              </Link>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="outline" size="icon" className="rounded-full">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <DrawerHeader>
                      <DrawerTitle>Меню</DrawerTitle>
                    </DrawerHeader>
                    <nav className="p-4 pb-8">
                      <div className="flex flex-col space-y-2">
                        <DrawerClose asChild>
                            <Button 
                                variant="outline" 
                                className="w-full justify-start text-lg p-3 h-auto font-normal"
                                onClick={() => setIsSearchOpen(true)}
                            >
                                <Search className="h-5 w-5 mr-3" />
                                Поиск
                            </Button>
                        </DrawerClose>

                        <div className="border-t my-2"></div>
                        
                        <DrawerClose asChild>
                          <Link to="/catalog" className="block text-lg p-3 rounded-md hover:bg-muted">Каталог</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/candle-care" className="block text-lg p-3 rounded-md hover:bg-muted">Уход за свечами</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/about" className="block text-lg p-3 rounded-md hover:bg-muted">О нас</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/shipping" className="block text-lg p-3 rounded-md hover:bg-muted">Доставка</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/contact" className="block text-lg p-3 rounded-md hover:bg-muted">Контакты</Link>
                        </DrawerClose>
                      </div>
                    </nav>
                  </DrawerContent>
                </Drawer>
              </div>
            </div>
          </div>
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
