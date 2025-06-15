
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Terms = () => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <Header cartItemsCount={totalItems} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-8">Условия пользования</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие условия</h2>
              <p>
                Настоящие Условия пользования регулируют отношения между интернет-магазином 
                Prototype Shop и его пользователями при использовании сайта и приобретении товаров.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Регистрация и аккаунт</h2>
              <p>
                Для оформления заказов рекомендуется создать личный кабинет. При регистрации 
                вы обязуетесь предоставить достоверную информацию и поддерживать её актуальность.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Заказы и оплата</h2>
              <ul className="list-disc ml-6">
                <li>Все цены указаны в рублях РФ и включают НДС</li>
                <li>Заказ считается принятым после получения подтверждения от магазина</li>
                <li>Оплата производится удобным для вас способом</li>
                <li>Мы оставляем за собой право отменить заказ при отсутствии товара</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Доставка</h2>
              <p>
                Условия доставки зависят от выбранного способа и региона. Подробную информацию 
                см. на странице <a href="/shipping" className="text-primary hover:underline">Доставка</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Возврат и обмен</h2>
              <p>
                Возврат товара возможен в течение 14 дней с момента получения при соблюдении 
                условий возврата. Товар должен быть в оригинальной упаковке и не использован.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Ответственность</h2>
              <p>
                Мы не несём ответственности за ущерб, возникший в результате неправильного 
                использования товаров. Рекомендуем ознакомиться с правилами 
                <a href="/candle-care" className="text-primary hover:underline"> ухода за свечами</a>.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">7. Изменения условий</h2>
              <p>
                Мы оставляем за собой право изменять данные условия. Актуальная версия 
                всегда доступна на данной странице.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">8. Контакты</h2>
              <p>
                По всем вопросам обращайтесь к нам через страницу 
                <a href="/contact" className="text-primary hover:underline"> Контакты</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Terms;
