
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface CartSummaryProps {
  totalItems: number;
  totalPrice: number;
  totalDiscount: number;
  onSubmitOrder: () => void;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ 
  totalItems, 
  totalPrice, 
  totalDiscount, 
  onSubmitOrder 
}) => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-4">Итого</h3>
        
        <div className="space-y-3 mb-4">
          <div className="flex justify-between">
            <span>Товары ({totalItems})</span>
            <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
          </div>
          
          {totalDiscount > 0 && (
            <div className="flex justify-between text-green-600">
              <span>Скидка</span>
              <span>-{totalDiscount.toLocaleString('ru-RU')} ₽</span>
            </div>
          )}
          
          <div className="flex justify-between">
            <span>Доставка</span>
            <span className="text-green-600">Бесплатно</span>
          </div>
        </div>
        
        <Separator className="my-4" />
        
        <div className="flex justify-between text-lg font-bold mb-6">
          <span>К оплате</span>
          <span>{totalPrice.toLocaleString('ru-RU')} ₽</span>
        </div>
        
        <Button className="w-full mb-3" onClick={onSubmitOrder}>
          Оформить заказ
        </Button>
        
        <div className="text-xs text-muted-foreground text-center">
          Нажимая "Оформить заказ", вы соглашаетесь с условиями доставки и возврата
        </div>
      </CardContent>
    </Card>
  );
};
