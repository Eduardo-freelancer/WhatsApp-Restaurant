import React, { useState } from "react";
import { cn } from "../lib/utils";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import {
  Coffee,
  Utensils,
  Wine,
  IceCream,
  Pizza,
  Soup,
  Salad,
} from "lucide-react";

interface Category {
  id: string;
  name: string;
  icon?: React.ReactNode;
}

interface MenuCategoriesProps {
  categories?: Category[];
  activeCategory?: string;
  onCategoryChange?: (categoryId: string) => void;
}

const MenuCategories = ({
  categories = [
    { id: "entradas", name: "Entradas", icon: <Soup className="h-4 w-4" /> },
    {
      id: "principais",
      name: "Pratos Principais",
      icon: <Pizza className="h-4 w-4" />,
    },
    { id: "bebidas", name: "Bebidas", icon: <Coffee className="h-4 w-4" /> },
    {
      id: "sobremesas",
      name: "Sobremesas",
      icon: <IceCream className="h-4 w-4" />,
    },
    { id: "saladas", name: "Saladas", icon: <Salad className="h-4 w-4" /> },
  ],
  activeCategory = "entradas",
  onCategoryChange = () => {},
}: MenuCategoriesProps) => {
  const [selectedCategory, setSelectedCategory] =
    useState<string>(activeCategory);

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    onCategoryChange(categoryId);
  };

  return (
    <div className="w-full bg-black/40 backdrop-blur-md shadow-md sticky top-0 z-10 border-b border-white/10">
      <ScrollArea className="w-full">
        <div className="flex p-3 space-x-3 overflow-x-auto">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryClick(category.id)}
              className={cn(
                "px-4 py-2 rounded-md whitespace-nowrap transition-all duration-300",
                "text-sm font-medium min-w-[100px] md:min-w-[120px] transform hover:scale-105",
                selectedCategory === category.id
                  ? "bg-white/20 text-white shadow-md backdrop-blur-sm border border-white/10"
                  : "bg-black/30 hover:bg-white/10 text-white/80 backdrop-blur-sm border border-white/5",
              )}
            >
              {category.icon && (
                <span className="mr-2 text-white/80">{category.icon}</span>
              )}
              {category.name}
            </button>
          ))}
        </div>
        <ScrollBar orientation="horizontal" className="bg-white/10" />
      </ScrollArea>
    </div>
  );
};

export default MenuCategories;
