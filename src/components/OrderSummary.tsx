import React from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Separator } from "./ui/separator";
import { X, Check, AlertCircle, ShoppingBag } from "lucide-react";

interface OrderItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  customizations?: string[];
}

interface OrderSummaryProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: OrderItem[];
  onConfirm?: () => void;
  onCancel?: () => void;
}

const OrderSummary = ({
  isOpen = true,
  onClose = () => {},
  items = [
    { id: "1", name: "Bruschetta", price: 12.99, quantity: 2 },
    {
      id: "2",
      name: "Pizza Margherita",
      price: 24.99,
      quantity: 1,
      customizations: ["Sem cebola", "Borda recheada"],
    },
    { id: "3", name: "Água Mineral", price: 4.99, quantity: 2 },
  ],
  onConfirm = () => {},
  onCancel = () => {},
}: OrderSummaryProps) => {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
  const deliveryFee = 5.99;
  const total = subtotal + deliveryFee;

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-white rounded-xl border-0 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-gray-800 flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-orange-500 mr-2" />
            Resumo do Pedido
          </DialogTitle>
        </DialogHeader>

        <div className="mt-5 max-h-[400px] overflow-y-auto pr-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="mb-4 p-4 border border-orange-100 rounded-xl bg-gradient-to-r from-orange-50/50 to-white shadow-sm hover:shadow transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    Quantidade: {item.quantity}
                  </p>
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.customizations.map((custom, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-orange-100 text-orange-700 rounded-full px-3 py-1 inline-block"
                        >
                          {custom}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="font-medium text-orange-600">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3 bg-orange-50/50 p-4 rounded-xl">
          <div className="flex justify-between">
            <span className="text-gray-600">Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Taxa de entrega</span>
            <span>{formatCurrency(deliveryFee)}</span>
          </div>
          <Separator className="my-2 bg-orange-200/50" />
          <div className="flex justify-between font-bold">
            <span className="text-gray-800">Total</span>
            <span className="text-orange-600 text-lg">
              {formatCurrency(total)}
            </span>
          </div>
        </div>

        <div className="mt-5 bg-blue-50 border border-blue-100 rounded-xl p-4 shadow-sm">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-blue-500 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-blue-700 font-medium mb-1">
                Tempo estimado de preparo: 30-45 minutos
              </p>
              <p className="text-sm text-blue-600">
                Ao confirmar, você será redirecionado para o WhatsApp para
                finalizar seu pedido.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-5">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto rounded-full border-gray-200 hover:bg-gray-100 transition-all duration-200"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button
            className="flex items-center gap-2 w-full sm:w-auto bg-orange-500 hover:bg-orange-600 rounded-full shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
            onClick={onConfirm}
          >
            <Check className="h-4 w-4" />
            Confirmar e Enviar via WhatsApp
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default OrderSummary;
