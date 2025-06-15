
import React from 'react';

interface CartHeaderProps {
  totalItems: number;
}

export const CartHeader: React.FC<CartHeaderProps> = ({ totalItems }) => {
  return (
    <div className="mb-6">
      <h1 className="text-4xl font-playfair font-bold text-primary mb-2">
        Корзина
      </h1>
      <p className="text-muted-foreground">
        {totalItems} {totalItems === 1 ? 'товар' : totalItems < 5 ? 'товара' : 'товаров'} в корзине
      </p>
    </div>
  );
};
