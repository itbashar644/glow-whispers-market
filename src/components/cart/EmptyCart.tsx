
import React from 'react';
import { Button } from "@/components/ui/button";
import { ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

export const EmptyCart: React.FC = () => {
  return (
    <div className="text-center">
      <ShoppingBag className="mx-auto h-24 w-24 text-muted-foreground mb-6" />
      <h1 className="text-3xl font-playfair font-bold text-primary mb-4">
        Ваша корзина пуста
      </h1>
      <p className="text-muted-foreground mb-8 max-w-md mx-auto">
        Добавьте товары в корзину, чтобы продолжить покупки
      </p>
      <Link to="/catalog">
        <Button size="lg">
          Перейти к покупкам
        </Button>
      </Link>
    </div>
  );
};
