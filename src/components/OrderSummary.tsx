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
  image?: string;
}

interface OrderSummaryProps {
  isOpen?: boolean;
  onClose?: () => void;
  items?: OrderItem[];
  onConfirm?: () => void;
  onCancel?: () => void;
}

const OrderSummary = ({
  isOpen = false,
  onClose = () => {},
  items = [],
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
      <DialogContent className="sm:max-w-md md:max-w-lg backdrop-blur-md bg-black/40 text-white rounded-xl border border-white/10 shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-white flex items-center justify-center">
            <ShoppingBag className="h-6 w-6 text-white/80 mr-2" />
            Resumo do Pedido
          </DialogTitle>
        </DialogHeader>

        <div className="mt-5 max-h-[400px] overflow-y-auto pr-2">
          {items.map((item) => (
            <div
              key={item.id}
              className="mb-4 p-4 border border-white/10 rounded-xl bg-white/5 shadow-sm hover:shadow transition-all duration-200"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-white">{item.name}</h3>
                  <p className="text-sm text-white/70 mt-1">
                    Quantidade: {item.quantity}
                  </p>
                  {item.customizations && item.customizations.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1">
                      {item.customizations.map((custom, idx) => (
                        <span
                          key={idx}
                          className="text-xs bg-white/10 text-white/80 rounded-full px-3 py-1 inline-block"
                        >
                          {custom}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <p className="font-medium text-white/90">
                  {formatCurrency(item.price * item.quantity)}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-5 space-y-3 bg-white/5 p-4 rounded-xl border border-white/10">
          <div className="flex justify-between">
            <span className="text-white/70">Subtotal</span>
            <span className="text-white">{formatCurrency(subtotal)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-white/70">Taxa de entrega</span>
            <span className="text-white">{formatCurrency(deliveryFee)}</span>
          </div>
          <Separator className="my-2 bg-white/10" />
          <div className="flex justify-between font-bold">
            <span className="text-white">Total</span>
            <span className="text-white text-lg">{formatCurrency(total)}</span>
          </div>
        </div>

        <div className="mt-5 bg-white/5 border border-white/10 rounded-xl p-4 shadow-sm">
          <div className="flex items-start">
            <AlertCircle className="h-5 w-5 text-white/80 mr-3 flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm text-white/80 font-medium mb-1">
                Tempo estimado de preparo: 30-45 minutos
              </p>
              <p className="text-sm text-white/70">
                Ao confirmar, você será redirecionado para o WhatsApp para
                finalizar seu pedido.
              </p>
            </div>
          </div>
        </div>

        <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-5">
          <Button
            variant="outline"
            className="flex items-center gap-2 w-full sm:w-auto rounded-md border-white/20 hover:bg-white/10 text-white transition-all duration-200"
            onClick={onCancel}
          >
            <X className="h-4 w-4" />
            Cancelar
          </Button>
          <Button
            className="flex items-center gap-2 w-full sm:w-auto bg-white/20 hover:bg-white/30 rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] backdrop-blur-sm border border-white/10"
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
