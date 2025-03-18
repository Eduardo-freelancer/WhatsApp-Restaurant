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
import { Minus, Plus, X } from "lucide-react";

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
    onAddToCart(item, quantity, selectedOptions);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] bg-white rounded-xl border-0 shadow-xl overflow-hidden p-0">
        <div className="relative h-[250px] w-full overflow-hidden">
          <img
            src={item.image}
            alt={item.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="absolute top-3 right-3 text-white hover:bg-black/20 rounded-full"
          >
            <X className="h-5 w-5" />
          </Button>
          <h2 className="absolute bottom-4 left-6 text-2xl font-bold text-white">
            {item.name}
          </h2>
        </div>

        <div className="grid gap-6 p-6">
          <p className="text-gray-700 leading-relaxed">{item.description}</p>

          <div className="mt-2">
            <h3 className="text-lg font-semibold mb-2 text-orange-600">
              Preço: R$ {item.price.toFixed(2)}
            </h3>
          </div>

          {item.customizationOptions &&
            item.customizationOptions.length > 0 && (
              <div className="mt-4 bg-orange-50/50 p-4 rounded-xl border border-orange-100">
                <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
                  <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center mr-2 text-orange-500 text-sm">
                    +
                  </span>
                  Personalizações
                </h3>
                <div className="space-y-3">
                  {item.customizationOptions.map((option) => (
                    <div
                      key={option.id}
                      className="flex items-center justify-between hover:bg-orange-50 p-2 rounded-lg transition-colors duration-200"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id={`option-${option.id}`}
                          checked={selectedOptions.includes(option.id)}
                          onChange={() => toggleOption(option.id)}
                          className="h-5 w-5 rounded border-orange-200 text-orange-500 focus:ring-orange-500"
                        />
                        <label
                          htmlFor={`option-${option.id}`}
                          className="text-sm font-medium text-gray-700 cursor-pointer"
                        >
                          {option.name}
                        </label>
                      </div>
                      <span className="text-sm font-medium text-orange-600">
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
            <h3 className="text-lg font-semibold mb-3 text-gray-800">
              Quantidade
            </h3>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="icon"
                onClick={handleDecreaseQuantity}
                disabled={quantity <= 1}
                className="rounded-full border-orange-200 text-orange-500 hover:bg-orange-50 hover:border-orange-300 h-10 w-10"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                value={quantity}
                onChange={(e) =>
                  setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                }
                className="w-20 text-center rounded-lg border-orange-200 focus:ring-orange-500 focus:border-orange-500"
                min="1"
              />
              <Button
                variant="outline"
                size="icon"
                onClick={handleIncreaseQuantity}
                className="rounded-full border-orange-200 text-orange-500 hover:bg-orange-50 hover:border-orange-300 h-10 w-10"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="mt-5 bg-orange-50 p-4 rounded-xl border border-orange-100 flex justify-between items-center">
            <h3 className="text-lg font-medium text-gray-800">Total:</h3>
            <span className="text-xl font-bold text-orange-600">
              R$ {calculateTotalPrice()}
            </span>
          </div>
        </div>

        <DialogFooter className="p-6 pt-0">
          <Button
            variant="outline"
            onClick={onClose}
            className="rounded-full border-gray-200 hover:bg-gray-100"
          >
            Cancelar
          </Button>
          <Button
            onClick={handleAddToCart}
            className="bg-orange-500 hover:bg-orange-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
          >
            Adicionar ao Carrinho
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ItemDetailModal;
