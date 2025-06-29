
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProductGrid } from "@/components/ProductGrid";
import { Footer } from "@/components/Footer";
import { useCart } from "@/contexts/CartContext";

export interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  scent: string;
  burnTime: string;
  description: string;
  isNew?: boolean;
  isOnSale?: boolean;
}

const Index = () => {
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
    }
  ];

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={totalItems} products={products} />
      <Hero />
      <ProductGrid 
        products={products}
        onAddToCart={addToCart}
      />
      <Footer />
    </div>
  );
};

export default Index;
