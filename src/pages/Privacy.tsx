
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { useCart } from '@/contexts/CartContext';

const Privacy = () => {
  const { totalItems } = useCart();

  return (
    <div className="min-h-screen bg-warm-gradient flex flex-col">
      <Header cartItemsCount={totalItems} />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-sm rounded-lg p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-primary mb-8">Политика конфиденциальности</h1>
          
          <div className="space-y-6 text-gray-700">
            <section>
              <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
              <p>
                Настоящая Политика конфиденциальности определяет порядок обработки персональных данных 
                пользователей интернет-магазина свечей Prototype Shop.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">2. Сбор персональных данных</h2>
              <p>
                Мы собираем только необходимые персональные данные для обеспечения качественного 
                обслуживания наших клиентов:
              </p>
              <ul className="list-disc ml-6 mt-2">
                <li>ФИО</li>
                <li>Адрес электронной почты</li>
                <li>Номер телефона</li>
                <li>Адрес доставки</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">3. Цели обработки данных</h2>
              <p>Ваши персональные данные используются для:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Обработки и выполнения заказов</li>
                <li>Связи с клиентами по вопросам заказов</li>
                <li>Информирования о новых товарах и акциях</li>
                <li>Улучшения качества обслуживания</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">4. Защита данных</h2>
              <p>
                Мы применяем современные технические и организационные меры для защиты ваших 
                персональных данных от несанкционированного доступа, изменения, раскрытия или уничтожения.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">5. Ваши права</h2>
              <p>Вы имеете право:</p>
              <ul className="list-disc ml-6 mt-2">
                <li>Получать информацию об обработке ваших данных</li>
                <li>Требовать исправления неточных данных</li>
                <li>Требовать удаления ваших данных</li>
                <li>Отозвать согласие на обработку данных</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-semibold mb-3">6. Контактная информация</h2>
              <p>
                По вопросам, связанным с обработкой персональных данных, вы можете обратиться к нам 
                через страницу <a href="/contact" className="text-primary hover:underline">Контакты</a>.
              </p>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy;
