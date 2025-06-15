
import { useState, useEffect } from "react";
import { Search, Package, FileText, Phone, Info } from "lucide-react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useNavigate } from "react-router-dom";
import type { Product } from "@/pages/Index";

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  products: Product[];
}

export const SearchDialog = ({ open, onOpenChange, products }: SearchDialogProps) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Фильтруем продукты по поисковому запросу
  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.scent.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Страницы сайта для поиска
  const pages = [
    { title: "Каталог", url: "/catalog", icon: Package },
    { title: "Коллекции", url: "/collections", icon: Package },
    { title: "О нас", url: "/about", icon: Info },
    { title: "Контакты", url: "/contact", icon: Phone },
  ];

  const filteredPages = pages.filter(page =>
    page.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelect = (callback: () => void) => {
    onOpenChange(false);
    callback();
  };

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        onOpenChange(!open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [open, onOpenChange]);

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput 
        placeholder="Поиск товаров, страниц..." 
        value={searchQuery}
        onValueChange={setSearchQuery}
      />
      <CommandList>
        <CommandEmpty>Ничего не найдено.</CommandEmpty>
        
        {filteredPages.length > 0 && (
          <CommandGroup heading="Страницы">
            {filteredPages.map((page) => (
              <CommandItem
                key={page.url}
                onSelect={() => handleSelect(() => navigate(page.url))}
              >
                <page.icon className="mr-2 h-4 w-4" />
                <span>{page.title}</span>
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {filteredProducts.length > 0 && (
          <CommandGroup heading="Товары">
            {filteredProducts.slice(0, 8).map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => handleSelect(() => {
                  // Пока просто переходим на главную, можно будет добавить страницу товара
                  navigate("/");
                  // Здесь можно добавить скролл к товару или переход на страницу товара
                })}
              >
                <Package className="mr-2 h-4 w-4" />
                <div className="flex flex-col">
                  <span>{product.name}</span>
                  <span className="text-sm text-muted-foreground">
                    {product.category} • {product.price.toLocaleString('ru-RU')} ₽
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        )}
      </CommandList>
    </CommandDialog>
  );
};
