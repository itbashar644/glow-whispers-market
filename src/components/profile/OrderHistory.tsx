
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: { name: string; price: number; quantity: number }[];
};

interface OrderHistoryProps {
  orders: Order[];
}

const getStatusColor = (status: string) => {
  switch (status) {
    case "Доставлен":
      return "bg-green-100 text-green-800";
    case "В пути":
      return "bg-blue-100 text-blue-800";
    case "Обрабатывается":
      return "bg-yellow-100 text-yellow-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const OrderHistory = ({ orders }: OrderHistoryProps) => {
  if (orders.length === 0) {
    return (
      <Card>
        <CardContent className="pt-6">
          <p className="text-muted-foreground text-center">У вас пока нет заказов.</p>
        </CardContent>
      </Card>
    )
  }
  
  return (
    <div className="space-y-4">
      {orders.map((order) => (
        <Card key={order.id}>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="text-lg">Заказ #{order.id.substring(0, 8)}</CardTitle>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.created_at).toLocaleDateString('ru-RU')}
                </p>
              </div>
              <Badge className={getStatusColor(order.status)}>
                {order.status}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {order.items.map((item, index) => (
                <div key={index} className="flex justify-between">
                  <span>{item.name} × {item.quantity}</span>
                  <span>{item.price * item.quantity} ₽</span>
                </div>
              ))}
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Итого:</span>
                <span>{order.total} ₽</span>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
