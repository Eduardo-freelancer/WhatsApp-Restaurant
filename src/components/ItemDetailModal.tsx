import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Minus, Plus, X, Clock, Tag, Star } from "lucide-react";

interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  customizationOptions?: CustomizationOption[];
  tags?: string[];
  prepTime?: string;
  rating?: number;
}

interface ItemDetailModalProps {
  item?: MenuItem;
  isOpen?: boolean;
  onClose?: () => void;
  onAddToCart?: (
    item: MenuItem,
    quantity: number,
    selectedOptions: string[],
  ) => void;
}

const ItemDetailModal = ({
  item = {
    id: "1",
    name: "Hambúrguer Clássico",
    description:
      "Hambúrguer de carne bovina, queijo cheddar, alface, tomate e molho especial.",
    price: 25.9,
    image:
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=500&q=80",
    customizationOptions: [
      { id: "1", name: "Bacon extra", price: 3.5 },
      { id: "2", name: "Queijo extra", price: 2.5 },
      { id: "3", name: "Molho picante", price: 1.0 },
    ],
    tags: ["Burger", "Clássico"],
    prepTime: "15-20 min",
    rating: 4.7,
  },
  isOpen = false,
  onClose = () => {},
  onAddToCart = () => {},
}: ItemDetailModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleIncreaseQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  const toggleOption = (optionId: string) => {
    setSelectedOptions((prev) =>
      prev.includes(optionId)
        ? prev.filter((id) => id !== optionId)
        : [...prev, optionId],
    );
  };

  const calculateTotalPrice = () => {
    let total = item.price * quantity;

    if (item.customizationOptions) {
      item.customizationOptions.forEach((option) => {
        if (selectedOptions.includes(option.id)) {
          total += option.price * quantity;
        }
      });
    }

    return total.toFixed(2);
  };

  const handleAddToCart = () => {
    const selectedCustomizations = item.customizationOptions
      ?.filter((option) => selectedOptions.includes(option.id))
      .map((option) => option.name);

    onAddToCart(item, quantity, selectedCustomizations);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-zinc-900 text-white rounded-xl border border-indigo-800 shadow-xl overflow-hidden p-0">
        <div className="relative h-[250px] w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent"></div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:bg-zinc-800/50 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
          <div className="absolute bottom-4 left-6 right-6">
            <h2 className="text-2xl font-bold text-white mb-1">{item.name}</h2>

            {item.tags && item.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {item.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-indigo-900/70 text-indigo-300 px-2 py-0.5 rounded-full border border-indigo-800/50 flex items-center"
                  >
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="flex items-center gap-3">
              {item.prepTime && (
                <div className="flex items-center text-xs text-indigo-300">
                  <Clock className="h-3 w-3 mr-1 text-indigo-400" />
                  {item.prepTime}
                </div>
              )}

              {item.rating && (
                <div className="flex items-center text-xs text-indigo-300">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${i < Math.floor(item.rating) ? "text-indigo-400 fill-indigo-400" : "text-zinc-600"}`}
                      />
                    ))}
                    <span className="ml-1">{item.rating}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="grid gap-6 p-6">
          <p className="text-indigo-200 leading-relaxed">{item.description}</p>

          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-2 text-indigo-400">
              Preço: R$ {item.price.toFixed(2)}
            </h3>
          </div>

          {item.customizationOptions &&
            item.customizationOptions.length > 0 && (
              <div className="mt-4 bg-indigo-900/20 p-4 rounded-xl border border-indigo-800/50">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-white">
                  <span className="w-6 h-6 rounded-full bg-indigo-800/80 flex items-center justify-center mr-2 text-indigo-300 text-sm">
                    +
                  </span>
                  Personalizações
                </h3>
                <div className="space-y-3">
                  {item.customizationOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between hover:bg-indigo-800/30 p-2 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`option-${option.id}`}
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => toggleOption(option.id)}
                          className="h-5 w-5 rounded border-indigo-700 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`option-${option.id}`}
                          className="text-sm font-medium text-white cursor-pointer"
                        >
                          {option.name}
                        </label>
                      </div>
                      <span className="text-sm font-medium text-indigo-400">
                        {option.price > 0
                          ? `+R$ ${option.price.toFixed(2)}`
                          : option.price < 0
                            ? `-R$ ${Math.abs(option.price).toFixed(2)}`
                            : "Grátis"}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          <div className="mt-4">
            <h3 className="text-lg font-semibold mb-3 text-white">
              Quantidade
            </h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
                className="rounded-full border-indigo-700 text-indigo-400 hover:bg-indigo-900/50 hover:border-indigo-600 h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-20 text-center rounded-lg border-indigo-700 focus:ring-indigo-500 focus:border-indigo-500 bg-zinc-800 text-white"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncreaseQuantity}
                className="rounded-full border-indigo-700 text-indigo-400 hover:bg-indigo-900/50 hover:border-indigo-600 h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-5 bg-indigo-900/20 p-4 rounded-xl border border-indigo-800/50 flex justify-between items-center">
            <h3 className="text-lg font-medium text-white">Total:</h3>
            <span className="text-xl font-bold text-indigo-400">
              R$ {calculateTotalPrice()}
            </span>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-md border-indigo-700 text-white hover:bg-indigo-900/50"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddToCart}
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
