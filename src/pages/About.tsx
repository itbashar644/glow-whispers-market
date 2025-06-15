
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, Award, Clock, Users } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen bg-warm-gradient">
      <Header cartItemsCount={0} />
      
      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl font-playfair font-bold text-primary mb-6">
            О нас
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Prototype-X.Shop — это история о страсти к созданию уникальных свечей, 
            которые превращают обычные моменты в особенные воспоминания.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-playfair font-bold text-primary mb-6">
                Наша история
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Начавшись как небольшая мастерская в 2020 году, мы превратились в 
                одного из ведущих производителей премиальных свечей ручной работы. 
                Каждая свеча создается с любовью и вниманием к деталям.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Мы используем только натуральные материалы: соевый воск, хлопковые фитили 
                и эфирные масла высочайшего качества. Наша миссия — создавать продукты, 
                которые делают ваш дом более уютным и наполняют его теплом.
              </p>
              <Button size="lg">Связаться с нами</Button>
            </div>
            <div className="relative">
              <img 
                src="/lovable-uploads/4d2d1e2b-d54d-48bf-97f7-c4ccfc756655.png" 
                alt="Мастерская свечей" 
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 bg-white/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-center text-primary mb-12">
            Наши ценности
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Heart className="h-12 w-12 text-candle-flame mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Любовь к ремеслу</h3>
                <p className="text-muted-foreground text-sm">
                  Каждая свеча создается с душой и вниманием к деталям
                </p>
              </CardContent>
            </Card>
            
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Award className="h-12 w-12 text-candle-flame mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Качество</h3>
                <p className="text-muted-foreground text-sm">
                  Только натуральные материалы и проверенные технологии
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Clock className="h-12 w-12 text-candle-flame mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Традиции</h3>
                <p className="text-muted-foreground text-sm">
                  Сочетаем традиционные методы с современными подходами
                </p>
              </CardContent>
            </Card>

            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Users className="h-12 w-12 text-candle-flame mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Клиенты</h3>
                <p className="text-muted-foreground text-sm">
                  Ваше удовлетворение — наш главный приоритет
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
