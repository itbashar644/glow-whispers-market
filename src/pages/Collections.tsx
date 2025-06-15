
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const Collections = () => {
  const collections = [
    {
      id: 1,
      name: "Времена года",
      description: "Коллекция ароматических свечей, отражающих красоту каждого сезона",
      image: "https://images.unsplash.com/photo-1602874801006-2b21dc4fcc48?w=600&h=400&fit=crop",
      itemsCount: 12,
      isNew: true
    },
    {
      id: 2,
      name: "Городские огни",
      description: "Современные ароматы для динамичной городской жизни",
      image: "https://images.unsplash.com/photo-1615887023516-0e3d60982f11?w=600&h=400&fit=crop",
      itemsCount: 8,
      isNew: false
    },
    {
      id: 3,
      name: "Природная гармония",
      description: "Натуральные ароматы леса, моря и горных лугов",
      image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=600&h=400&fit=crop",
      itemsCount: 15,
      isNew: false
    },
    {
      id: 4,
      name: "Винтаж",
      description: "Классические ароматы с нотками старинной элегантности",
      image: "https://images.unsplash.com/photo-1544705259-d3d395b8bdc3?w=600&h=400&fit=crop",
      itemsCount: 10,
      isNew: false
    },
    {
      id: 5,
      name: "Романтика",
      description: "Нежные цветочные ароматы для особых моментов",
      image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=400&fit=crop",
      itemsCount: 9,
      isNew: true
    },
    {
      id: 6,
      name: "Пряные вечера",
      description: "Согревающие пряные ароматы для уютных зимних вечеров",
      image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop",
      itemsCount: 7,
      isNew: false
    }
  ];

  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={0} />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-playfair font-bold text-primary mb-6">
            Наши коллекции
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Каждая коллекция — это уникальная история, рассказанная через ароматы. 
            Откройте для себя мир наших тщательно подобранных свечей.
          </p>
        </div>
      </section>

      {/* Collections Grid */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((collection) => (
              <Card key={collection.id} className="group hover:shadow-lg transition-shadow duration-300 overflow-hidden">
                <div className="relative">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 flex gap-2">
                    {collection.isNew && (
                      <Badge className="bg-candle-flame text-white">Новинка</Badge>
                    )}
                    <Badge variant="secondary">{collection.itemsCount} товаров</Badge>
                  </div>
                </div>
                
                <CardContent className="p-6">
                  <h3 className="text-xl font-playfair font-bold text-primary mb-3">
                    {collection.name}
                  </h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">
                    {collection.description}
                  </p>
                  <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    Смотреть коллекцию
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <Badge className="mb-4 bg-candle-flame text-white">Хит сезона</Badge>
              <h2 className="text-4xl font-playfair font-bold text-primary mb-6">
                Коллекция "Времена года"
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Наша самая популярная коллекция, вдохновленная красотой и настроением 
                каждого времени года. От свежести весенних цветов до уютного тепла 
                зимних специй — каждая свеча создает атмосферу своего сезона.
              </p>
              <div className="space-y-3 mb-8">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-candle-flame rounded-full"></div>
                  <span className="text-muted-foreground">12 уникальных ароматов</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-candle-flame rounded-full"></div>
                  <span className="text-muted-foreground">50+ часов горения каждой свечи</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-candle-flame rounded-full"></div>
                  <span className="text-muted-foreground">100% натуральный соевый воск</span>
                </div>
              </div>
              <Button size="lg">Смотреть всю коллекцию</Button>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1602874801006-2b21dc4fcc48?w=600&h=500&fit=crop" 
                alt="Коллекция Времена года" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Collections;
