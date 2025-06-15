
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/components/ui/table";

type Order = {
  id: string;
  created_at: string;
  status: string;
  total: number;
  items: { name: string; price: number; quantity: number }[];
  order_number: number;
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
                <CardTitle className="text-lg">Заказ ORD-{String(order.order_number).padStart(3, '0')}</CardTitle>
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
            <Table>
              <TableBody>
                {order.items.map((item, index) => (
                  <TableRow key={index} className="border-none">
                    <TableCell className="p-0 pb-1 pr-2">{item.name} × {item.quantity}</TableCell>
                    <TableCell className="text-right p-0 pb-1 whitespace-nowrap">{item.price * item.quantity} ₽</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <Separator className="my-2" />
            <div className="flex justify-between font-semibold">
              <span>Итого:</span>
              <span>{order.total} ₽</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
