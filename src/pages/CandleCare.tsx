import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Flame, Clock, Thermometer, Scissors } from "lucide-react";

const CandleCare = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header cartItemsCount={0} />
      
      <main className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-playfair font-bold text-primary mb-8 text-center">
            Уход за свечами
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground mb-8 text-center">
              Правильный уход за свечами поможет вам наслаждаться их красотой и ароматом дольше
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {/* Первое зажигание */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <Flame className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-semibold">Первое зажигание</h2>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <p>• Дайте свече гореть 2-4 часа при первом использовании</p>
                <p>• Воск должен расплавиться до краев емкости</p>
                <p>• Это предотвратит образование "туннеля" в воске</p>
                <p>• Создаст равномерное горение в будущем</p>
              </div>
            </div>

            {/* Обрезка фитиля */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <Scissors className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-semibold">Обрезка фитиля</h2>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <p>• Обрезайте фитиль до 5-6 мм перед каждым зажиганием</p>
                <p>• Используйте специальные ножницы для фитиля</p>
                <p>• Это предотвратит копчение и неравномерное горение</p>
                <p>• Удалите обрезки фитиля из воска</p>
              </div>
            </div>

            {/* Время горения */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <Clock className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-semibold">Время горения</h2>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <p>• Не жгите свечу более 4 часов подряд</p>
                <p>• Делайте перерывы между сеансами горения</p>
                <p>• Дайте воску остыть перед повторным зажиганием</p>
                <p>• Это продлит срок службы свечи</p>
              </div>
            </div>

            {/* Условия хранения */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="flex items-center mb-4">
                <Thermometer className="h-6 w-6 text-primary mr-3" />
                <h2 className="text-xl font-semibold">Условия хранения</h2>
              </div>
              
              <div className="space-y-3 text-muted-foreground">
                <p>• Храните при комнатной температуре</p>
                <p>• Избегайте прямых солнечных лучей</p>
                <p>• Защищайте от пыли с помощью крышки</p>
                <p>• Держите вдали от сквозняков</p>
              </div>
            </div>
          </div>

          {/* Советы по безопасности */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8">
            <h3 className="text-lg font-semibold text-red-800 mb-4">Важные правила безопасности</h3>
            <div className="grid md:grid-cols-2 gap-4 text-red-700">
              <div>
                <p>• Никогда не оставляйте горящую свечу без присмотра</p>
                <p>• Держите свечи вдали от детей и домашних животных</p>
                <p>• Размещайте на устойчивой поверхности</p>
              </div>
              <div>
                <p>• Не перемещайте горящую свечу</p>
                <p>• Тушите свечу, если остался воск менее 5 мм</p>
                <p>• Используйте специальный колпачок для тушения</p>
              </div>
            </div>
          </div>

          {/* Как продлить жизнь свечи */}
          <div className="bg-warm-50 rounded-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Как продлить жизнь свечи</h3>
            <div className="space-y-3 text-muted-foreground">
              <p>🕯️ <strong>Используйте диммер для фитиля</strong> - это поможет контролировать размер пламени</p>
              <p>✨ <strong>Очищайте регулярно</strong> - удаляйте пыль и мусор с поверхности воска</p>
              <p>🌡️ <strong>Избегайте перепадов температур</strong> - это может привести к трещинам в воске</p>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CandleCare;
