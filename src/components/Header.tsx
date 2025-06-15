
import { useState } from "react";
import { ShoppingCart, Heart, Search, Menu, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { SearchDialog } from "@/components/SearchDialog";
import { useWishlist } from "@/contexts/WishlistContext";
import type { Product } from "@/pages/Index";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerClose,
} from "@/components/ui/drawer";
import { Separator } from "@/components/ui/separator";

interface HeaderProps {
  cartItemsCount: number;
  products?: Product[];
}

export const Header = ({ cartItemsCount, products = [] }: HeaderProps) => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { wishlist } = useWishlist();

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
            <div className="flex items-center md:space-x-4 space-x-2">
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
                      variant="destructive" 
                      className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs"
                    >
                      {wishlist.length}
                    </Badge>
                  )}
                </Button>
              </Link>
              
              <Link to="/cart">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-6 w-6" />
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
                  <User className="h-6 w-6" />
                </Button>
              </Link>

              {/* Mobile menu button */}
              <div className="md:hidden">
                <Drawer>
                  <DrawerTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <Menu className="h-6 w-6" />
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent>
                    <nav className="p-4 pt-8">
                      <div className="flex flex-col space-y-2">
                        <DrawerClose asChild>
                          <Link to="/catalog" className="text-lg p-3 rounded-md hover:bg-muted font-medium">Каталог</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/collections" className="text-lg p-3 rounded-md hover:bg-muted">Коллекции</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/about" className="text-lg p-3 rounded-md hover:bg-muted">О нас</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/contact" className="text-lg p-3 rounded-md hover:bg-muted">Контакты</Link>
                        </DrawerClose>

                        <Separator className="!my-4" />
                        
                        <DrawerClose asChild>
                          <Link to="/wishlist" className="flex items-center justify-between text-lg p-3 rounded-md hover:bg-muted">
                            <span>Избранное</span>
                            {wishlist.length > 0 && <Badge variant="secondary">{wishlist.length}</Badge>}
                          </Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/profile" className="text-lg p-3 rounded-md hover:bg-muted">Личный кабинет</Link>
                        </DrawerClose>
                        <DrawerClose asChild>
                          <Link to="/cart" className="flex items-center justify-between text-lg p-3 rounded-md hover:bg-muted">
                            <span>Корзина</span>
                            {cartItemsCount > 0 && <Badge variant="secondary">{cartItemsCount}</Badge>}
                          </Link>
                        </DrawerClose>
                        
                        <Separator className="!my-4" />

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
