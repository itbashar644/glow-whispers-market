
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ProductGrid } from "@/components/ProductGrid";
import { Product } from "@/pages/Index";

interface ProductsSectionProps {
  products: Product[];
  sortBy: string;
  onSortChange: (value: string) => void;
  onAddToCart: (productId: number) => void;
  onResetFilters: () => void;
}

export const ProductsSection = ({
  products,
  sortBy,
  onSortChange,
  onAddToCart,
  onResetFilters
}: ProductsSectionProps) => {
  return (
    <div className="lg:col-span-3">
      {/* Sort and Results */}
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground">
            Найдено товаров: 
          </span>
          <Badge variant="secondary">{products.length}</Badge>
        </div>
        
        <Select value={sortBy} onValueChange={onSortChange}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Сортировать по" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">По умолчанию</SelectItem>
            <SelectItem value="price-asc">Цена: по возрастанию</SelectItem>
            <SelectItem value="price-desc">Цена: по убыванию</SelectItem>
            <SelectItem value="rating">По рейтингу</SelectItem>
            <SelectItem value="name">По названию</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Products */}
      {products.length > 0 ? (
        <ProductGrid 
          products={products}
          onAddToCart={onAddToCart}
        />
      ) : (
        <div className="text-center py-16">
          <p className="text-xl text-muted-foreground mb-4">
            По выбранным фильтрам товары не найдены
          </p>
          <Button 
            variant="outline" 
            onClick={onResetFilters}
          >
            Сбросить фильтры
          </Button>
        </div>
      )}
    </div>
  );
};
