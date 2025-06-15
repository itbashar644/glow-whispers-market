
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const NotificationSettings = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Настройки уведомлений</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Email уведомления</h4>
            <p className="text-sm text-muted-foreground">
              Получать уведомления о статусе заказов
            </p>
          </div>
          <Button variant="outline" size="sm">
            Включено
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">SMS уведомления</h4>
            <p className="text-sm text-muted-foreground">
              Получать SMS о доставке заказов
            </p>
          </div>
          <Button variant="outline" size="sm">
            Отключено
          </Button>
        </div>
        
        <div className="flex items-center justify-between">
          <div>
            <h4 className="font-medium">Рекламные рассылки</h4>
            <p className="text-sm text-muted-foreground">
              Получать информацию о скидках и новинках
            </p>
          </div>
          <Button variant="outline" size="sm">
            Включено
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
