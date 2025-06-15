
import React from 'react';
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Minus, Plus, Trash2 } from "lucide-react";
import type { Product } from "@/pages/Index";

interface CartItemData {
  product: Product;
  quantity: number;
}

interface CartItemProps {
  item: CartItemData;
  onUpdateQuantity: (productId: number, newQuantity: number) => void;
  onRemoveItem: (productId: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({ item, onUpdateQuantity, onRemoveItem }) => {
  return (
    <div className="flex gap-4 p-4 border rounded-lg">
      <img 
        src={item.product.image} 
        alt={item.product.name}
        className="w-20 h-20 object-cover rounded-lg"
      />
      
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold text-primary truncate">
            {item.product.name}
          </h3>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onRemoveItem(item.product.id)}
            className="text-muted-foreground hover:text-destructive"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
        
        <p className="text-sm text-muted-foreground mb-2">
          {item.product.scent}
        </p>
        
        <Badge variant="outline" className="mb-3">
          {item.product.category}
        </Badge>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
            >
              <Minus className="h-3 w-3" />
            </Button>
            
            <span className="w-8 text-center font-medium">
              {item.quantity}
            </span>
            
            <Button
              variant="outline"
              size="icon"
              className="h-8 w-8"
              onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
            >
              <Plus className="h-3 w-3" />
            </Button>
          </div>
          
          <div className="text-right">
            <div className="font-bold text-primary">
              {(item.product.price * item.quantity).toLocaleString('ru-RU')} ₽
            </div>
            {item.product.originalPrice && (
              <div className="text-sm text-muted-foreground line-through">
                {(item.product.originalPrice * item.quantity).toLocaleString('ru-RU')} ₽
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
