
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ProductGrid } from "@/components/ProductGrid";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { useToast } from "@/hooks/use-toast";
import { Product } from "./Index";

const Catalog = () => {
  const { toast } = useToast();
  const [cartItems, setCartItems] = useState<number[]>([]);
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("default");

  const products: Product[] = [
    {
      id: 1,
      name: "Лавандовые Сны",
      price: 2800,
      originalPrice: 3200,
      image: "https://images.unsplash.com/photo-1602874801006-2b21dc4fcc48?w=400&h=500&fit=crop",
      category: "Ароматические",
      rating: 4.8,
      reviews: 124,
      scent: "Лаванда и ваниль",
      burnTime: "45-50 часов",
      description: "Успокаивающая свеча с натуральной лавандой для идеального расслабления.",
      isOnSale: true
    },
    {
      id: 2,
      name: "Цитрусовая Свежесть",
      price: 3100,
      image: "https://images.unsplash.com/photo-1615887023516-0e3d60982f11?w=400&h=500&fit=crop",
      category: "Цитрусовые",
      rating: 4.9,
      reviews: 89,
      scent: "Лимон и грейпфрут",
      burnTime: "40-45 часов",
      description: "Бодрящий аромат цитрусовых для энергии и хорошего настроения.",
      isNew: true
    },
    {
      id: 3,
      name: "Древесные Нотки",
      price: 3500,
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=500&fit=crop",
      category: "Древесные",
      rating: 4.7,
      reviews: 156,
      scent: "Сандал и кедр",
      burnTime: "50-55 часов",
      description: "Теплый древесный аромат создает атмосферу уюта и комфорта.",
      isNew: true
    },
    {
      id: 4,
      name: "Морской Бриз",
      price: 2900,
      image: "https://images.unsplash.com/photo-1544705259-d3d395b8bdc3?w=400&h=500&fit=crop",
      category: "Свежие",
      rating: 4.6,
      reviews: 67,
      scent: "Морская соль",
      burnTime: "42-48 часов",
      description: "Освежающий аромат океана для создания летнего настроения."
    },
    {
      id: 5,
      name: "Розовый Сад",
      price: 3300,
      originalPrice: 3800,
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=500&fit=crop",
      category: "Цветочные",
      rating: 4.9,
      reviews: 203,
      scent: "Роза и пион",
      burnTime: "48-52 часов",
      description: "Нежный цветочный аромат для романтической атмосферы.",
      isOnSale: true
    },
    {
      id: 6,
      name: "Пряные Специи",
      price: 2700,
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=400&h=500&fit=crop",
      category: "Пряные",
      rating: 4.5,
      reviews: 92,
      scent: "Корица и гвоздика",
      burnTime: "38-44 часов",
      description: "Согревающий пряный аромат для холодных вечеров."
    },
    {
      id: 7,
      name: "Ванильные Облака",
      price: 3200,
      image: "https://images.unsplash.com/photo-1590736969955-71cc94901144?w=400&h=500&fit=crop",
      category: "Сладкие",
      rating: 4.8,
      reviews: 178,
      scent: "Ваниль и карамель",
      burnTime: "46-50 часов",
      description: "Сладкий уютный аромат для домашней атмосферы."
    },
    {
      id: 8,
      name: "Зеленый Чай",
      price: 2950,
      image: "https://images.unsplash.com/photo-1602874801006-2b21dc4fcc48?w=400&h=500&fit=crop",
      category: "Свежие",
      rating: 4.6,
      reviews: 134,
      scent: "Зеленый чай и мята",
      burnTime: "44-48 часов",
      description: "Освежающий аромат для концентрации и умиротворения."
    }
  ];

  const categories = ["Ароматические", "Цитрусовые", "Древесные", "Свежие", "Цветочные", "Пряные", "Сладкие"];

  const addToCart = (productId: number) => {
    setCartItems(prev => [...prev, productId]);
    toast({
      title: "Товар добавлен в корзину",
      description: "Перейдите в корзину для оформления заказа",
    });
  };

  const handleCategoryChange = (category: string, checked: boolean) => {
    if (checked) {
      setSelectedCategories(prev => [...prev, category]);
    } else {
      setSelectedCategories(prev => prev.filter(c => c !== category));
    }
  };

  // Filter products based on selected filters
  const filteredProducts = products.filter(product => {
    const categoryMatch = selectedCategories.length === 0 || selectedCategories.includes(product.category);
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];
    return categoryMatch && priceMatch;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-asc":
        return a.price - b.price;
      case "price-desc":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "name":
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={cartItems.length} products={products} />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-playfair font-bold text-primary mb-6">
            Каталог свечей
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Полная коллекция наших премиальных свечей ручной работы
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-24">
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-6">Фильтры</h3>
                
                {/* Price Range */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">
                    Цена: {priceRange[0]} - {priceRange[1]} ₽
                  </Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={5000}
                    min={0}
                    step={100}
                    className="mb-4"
                  />
                </div>

                {/* Categories */}
                <div className="mb-6">
                  <Label className="text-sm font-medium mb-3 block">Категории</Label>
                  <div className="space-y-3">
                    {categories.map((category) => (
                      <div key={category} className="flex items-center space-x-2">
                        <Checkbox
                          id={category}
                          checked={selectedCategories.includes(category)}
                          onCheckedChange={(checked) => 
                            handleCategoryChange(category, checked as boolean)
                          }
                        />
                        <Label htmlFor={category} className="text-sm">
                          {category}
                        </Label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 5000]);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Products Grid */}
          <div className="lg:col-span-3">
            {/* Sort and Results */}
            <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground">
                  Найдено товаров: 
                </span>
                <Badge variant="secondary">{sortedProducts.length}</Badge>
              </div>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Сортировать по" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">По умолчанию</SelectItem>
                  <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
                  <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
                  <SelectItem value="rating">По рейтингу</SelectItem>
                  <SelectItem value="name">По названию</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Products */}
            {sortedProducts.length > 0 ? (
              <ProductGrid 
                products={sortedProducts}
                onAddToCart={addToCart}
              />
            ) : (
              <div className="text-center py-16">
                <p className="text-xl text-muted-foreground mb-4">
                  По выбранным фильтрам товары не найдены
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategories([]);
                    setPriceRange([0, 5000]);
                  }}
                >
                  Сбросить фильтры
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
