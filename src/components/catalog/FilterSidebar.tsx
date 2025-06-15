
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

interface FilterSidebarProps {
  priceRange: number[];
  onPriceRangeChange: (range: number[]) => void;
  selectedCategories: string[];
  onCategoryChange: (category: string, checked: boolean) => void;
  onResetFilters: () => void;
  categories: string[];
}

export const FilterSidebar = ({
  priceRange,
  onPriceRangeChange,
  selectedCategories,
  onCategoryChange,
  onResetFilters,
  categories
}: FilterSidebarProps) => {
  return (
    <Card className="sticky top-24">
      <CardContent className="p-6">
        <h3 className="text-lg font-semibold mb-6">Фильтры</h3>
        
        {/* Price Range */}
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">
            Цена: {priceRange[0]} - {priceRange[1]} ₽
          </Label>
          <Slider
            value={priceRange}
            onValueChange={onPriceRangeChange}
            max={5000}
            min={0}
            step={100}
            className="mb-4"
          />
        </div>

        {/* Categories */}
        <div className="mb-6">
          <Label className="text-sm font-medium mb-3 block">Категории</Label>
          <div className="space-y-3">
            {categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={category}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={(checked) => 
                    onCategoryChange(category, checked as boolean)
                  }
                />
                <Label htmlFor={category} className="text-sm">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <Button 
          variant="outline" 
          className="w-full"
          onClick={onResetFilters}
        >
          Сбросить фильтры
        </Button>
      </CardContent>
    </Card>
  );
};
