import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowRight,
  Clock,
  Sparkles,
  ChefHat,
  Utensils,
} from "lucide-react";
import { ScrollArea } from "./ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "./ui/badge";

interface CartItemType {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
  image?: string;
}

interface CartProps {
  items?: CartItemType[];
  onCheckout?: () => void;
  onUpdateQuantity?: (id: string, quantity: number) => void;
  onRemoveItem?: (id: string) => void;
}

const Cart = ({
  items = [
    {
      id: "1",
      name: "Bruschetta de Tomate",
      price: 18.9,
      quantity: 2,
      customizations: ["Sem cebola"],
      image:
        "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=200&q=80",
    },
    {
      id: "2",
      name: "Risoto de Cogumelos",
      price: 42.5,
      quantity: 1,
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=200&q=80",
    },
    {
      id: "3",
      name: "Água Mineral",
      price: 5.0,
      quantity: 3,
      image:
        "https://images.unsplash.com/photo-1520264834865-7effbe123aa3?w=200&q=80",
    },
  ],
  onCheckout = () => {
    // Default checkout handler
    const message = encodeURIComponent(
      `*Novo Pedido*\n\n${items
        .map(
          (item) =>
            `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}${item.customizations ? `\n   _${item.customizations.join(", ")}_` : ""}`,
        )
        .join("\n")}\n\n*Total: R$ ${total.toFixed(2)}*`,
    );
    window.open(`https://wa.me/?text=${message}`, "_blank");
  },
  onUpdateQuantity = () => {},
  onRemoveItem = () => {},
}: CartProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [animatingItemId, setAnimatingItemId] = useState<string | null>(null);
  const [estimatedTime, setEstimatedTime] = useState("30-45");

  // Calculate total
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // Handle item removal with animation
  const handleRemoveItem = (id: string) => {
    setAnimatingItemId(id);
    setTimeout(() => {
      onRemoveItem(id);
      setAnimatingItemId(null);
    }, 300);
  };

  // Update estimated time based on items and quantities
  useEffect(() => {
    const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems <= 2) {
      setEstimatedTime("20-30");
    } else if (totalItems <= 5) {
      setEstimatedTime("30-45");
    } else {
      setEstimatedTime("45-60");
    }
  }, [items]);

  if (items.length === 0) {
    return (
      <div className="w-full max-w-md mx-auto h-full bg-zinc-900 text-white border-l border-indigo-800 p-4 flex flex-col rounded-xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="h-5 w-5 text-indigo-500 mr-2" />
            Seu Pedido
          </h2>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <ShoppingBag className="h-20 w-20 text-indigo-500 mb-4 opacity-50" />
          </motion.div>
          <h3 className="text-lg font-medium mb-2 text-white">
            Seu carrinho está vazio
          </h3>
          <p className="text-zinc-300 mb-8">
            Adicione itens do menu para começar seu pedido
          </p>
          <Button
            className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-5 px-6 font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            Ver Cardápio <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto h-full bg-zinc-900 text-white border-l border-indigo-800 shadow-lg flex flex-col rounded-xl overflow-hidden">
      <div className="p-5 border-b border-indigo-800 bg-zinc-900 sticky top-0 z-10">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-bold flex items-center">
            <ShoppingBag className="h-5 w-5 text-indigo-500 mr-2" />
            Seu Pedido
          </h2>
          <Badge
            variant="outline"
            className="bg-indigo-900/50 text-indigo-400 border-indigo-700 px-2 py-1"
          >
            {items.reduce((sum, item) => sum + item.quantity, 0)}{" "}
            {items.reduce((sum, item) => sum + item.quantity, 0) === 1
              ? "item"
              : "itens"}
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <AnimatePresence>
          {items.map((item) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{
                opacity: animatingItemId === item.id ? 0 : 1,
                y: animatingItemId === item.id ? -20 : 0,
                height: animatingItemId === item.id ? 0 : "auto",
              }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="mb-5 pb-4 border-b border-indigo-900/50 last:border-0 hover:bg-indigo-900/20 p-3 rounded-lg transition-colors duration-200 group"
            >
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-start gap-3">
                  {item.image && (
                    <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0 border border-indigo-800 group-hover:border-indigo-600 transition-all duration-300 shadow-md group-hover:shadow-indigo-900/30">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-all duration-500"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    <h3 className="font-medium text-indigo-100 group-hover:text-indigo-400 transition-colors duration-200">
                      {item.name}
                    </h3>
                    {item.customizations && item.customizations.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {item.customizations.map((custom, idx) => (
                          <span
                            key={idx}
                            className="text-xs bg-indigo-900/30 text-indigo-400 rounded-full px-2 py-0.5 inline-flex items-center"
                          >
                            <Utensils className="h-3 w-3 mr-1 opacity-70" />
                            {custom}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-zinc-300 hover:text-red-500 p-1.5 hover:bg-red-900/20 rounded-full transition-colors duration-200 opacity-70 hover:opacity-100"
                  aria-label="Remover item"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <div className="flex justify-between items-center">
                <div className="flex items-center border border-indigo-700 rounded-md bg-zinc-900 overflow-hidden shadow-md group-hover:border-indigo-600 transition-all duration-200">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-1.5 hover:bg-indigo-900 text-indigo-500 transition-colors duration-200"
                    aria-label="Diminuir quantidade"
                  >
                    <Minus size={14} />
                  </button>
                  <span className="px-3 py-1 min-w-[36px] text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-1.5 hover:bg-indigo-900 text-indigo-500 transition-colors duration-200"
                    aria-label="Aumentar quantidade"
                  >
                    <Plus size={14} />
                  </button>
                </div>
                <span className="font-medium text-indigo-500 group-hover:text-indigo-400 transition-colors duration-200">
                  R$ {(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </ScrollArea>

      <div className="p-5 bg-zinc-900 border-t border-indigo-800 sticky bottom-0 z-10">
        {/* Estimated delivery time */}
        <div className="mb-4 p-3 bg-indigo-900/30 rounded-md border border-indigo-800 flex items-start hover:border-indigo-700 transition-colors duration-200 group">
          <ChefHat className="h-5 w-5 text-indigo-500 mr-2 flex-shrink-0 mt-0.5 group-hover:text-indigo-400 transition-colors duration-200" />
          <div>
            <p className="text-sm font-medium text-indigo-400 group-hover:text-indigo-300 transition-colors duration-200">
              Tempo estimado de preparo:
            </p>
            <p className="text-sm text-indigo-300 group-hover:text-indigo-200 transition-colors duration-200">
              {estimatedTime} minutos
            </p>
          </div>
        </div>

        <div className="space-y-3 mb-5">
          <div className="flex justify-between text-zinc-300">
            <span>Subtotal</span>
            <span>R$ {total.toFixed(2)}</span>
          </div>
          <Separator className="bg-indigo-800" />
          <div className="flex justify-between font-bold">
            <span>Total</span>
            <motion.span
              className="text-indigo-500 flex items-center"
              key={total}
              initial={{ scale: 1.2 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <Sparkles className="h-4 w-4 mr-1 text-indigo-400" />
              R$ {total.toFixed(2)}
            </motion.span>
          </div>
        </div>

        <Button
          onClick={onCheckout}
          className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-md py-5 font-medium shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          Finalizar Pedido via WhatsApp
        </Button>
      </div>
    </div>
  );
};

export default Cart;
