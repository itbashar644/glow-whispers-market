
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-gradient px-4">
      <div className="text-center max-w-md mx-auto">
        <div className="mb-8">
          <div className="w-24 h-24 bg-candle-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="w-8 h-12 bg-candle-flame rounded-full candle-flame"></div>
          </div>
          <h1 className="text-6xl font-playfair font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-playfair font-semibold text-primary mb-4">
            Страница не найдена
          </h2>
          <p className="text-muted-foreground mb-8 leading-relaxed">
            К сожалению, запрашиваемая страница не существует. 
            Возможно, она была перемещена или удалена.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild className="w-full sm:w-auto">
            <a href="/">
              <Home className="h-4 w-4 mr-2" />
              На главную
            </a>
          </Button>
          <Button variant="outline" onClick={() => window.history.back()} className="w-full sm:w-auto">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Назад
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
