
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { FilterSidebar } from "@/components/catalog/FilterSidebar";
import { ProductsSection } from "@/components/catalog/ProductsSection";
import { useCatalogFilters } from "@/hooks/useCatalogFilters";
import { Product } from "./Index";
import { useCart } from "@/contexts/CartContext";

const Catalog = () => {
  const { addToCart, totalItems } = useCart();

  const products: Product[] = [
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

  const categories = ["Цитрусовые", "Древесные", "Свежие", "Цветочные", "Пряные", "Сладкие"];

  const {
    priceRange,
    setPriceRange,
    selectedCategories,
    sortBy,
    setSortBy,
    handleCategoryChange,
    resetFilters,
    sortedProducts
  } = useCatalogFilters(products);

  const handleAddToCart = (productId: number) => {
    const product = products.find(p => p.id === productId);
    if (product) {
      addToCart(product);
    }
  };

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={totalItems} products={products} />
      
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
            <FilterSidebar
              priceRange={priceRange}
              onPriceRangeChange={setPriceRange}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryChange}
              onResetFilters={resetFilters}
              categories={categories}
            />
          </div>

          {/* Products Section */}
          <ProductsSection
            products={sortedProducts}
            sortBy={sortBy}
            onSortChange={setSortBy}
            onAddToCart={handleAddToCart}
            onResetFilters={resetFilters}
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Catalog;
