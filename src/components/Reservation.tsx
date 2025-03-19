import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarIcon, Clock, Send, Users } from "lucide-react";
import { cn } from "../lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

interface ReservationProps {
  isOpen?: boolean;
  onClose?: () => void;
  onSubmit?: (data: ReservationData) => void;
}

export interface ReservationData {
  name: string;
  phone: string;
  email: string;
  date: Date | undefined;
  time: string;
  guests: number;
  specialRequests: string;
}

const timeSlots = [
  "11:30",
  "12:00",
  "12:30",
  "13:00",
  "13:30",
  "14:00",
  "14:30",
  "18:30",
  "19:00",
  "19:30",
  "20:00",
  "20:30",
  "21:00",
  "21:30",
  "22:00",
];

const Reservation = ({
  isOpen = false,
  onClose = () => {},
  onSubmit = () => {},
}: ReservationProps) => {
  const [date, setDate] = useState<Date>();
  const [time, setTime] = useState<string>("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [guests, setGuests] = useState("2");
  const [specialRequests, setSpecialRequests] = useState("");
  const [calendarOpen, setCalendarOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Create WhatsApp message
    const message = encodeURIComponent(
      `*Nova Reserva*\n\n` +
        `*Nome:* ${name}\n` +
        `*Telefone:* ${phone}\n` +
        `*Email:* ${email}\n` +
        `*Data:* ${date ? format(date, "dd/MM/yyyy", { locale: ptBR }) : ""}\n` +
        `*Horário:* ${time}\n` +
        `*Número de pessoas:* ${guests}\n` +
        `*Solicitações especiais:* ${specialRequests || "Nenhuma"}`,
    );

    // Open WhatsApp with the message
    window.open(`https://wa.me/?text=${message}`, "_blank");

    // Call the onSubmit prop with the form data
    onSubmit({
      name,
      phone,
      email,
      date,
      time,
      guests: parseInt(guests),
      specialRequests,
    });

    // Close the dialog
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-lg bg-zinc-900 text-white border border-indigo-800 rounded-xl shadow-xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center text-indigo-500 flex items-center justify-center">
            <Users className="h-6 w-6 text-indigo-500 mr-2" />
            Fazer Reserva
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-indigo-400">
                Nome
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="bg-zinc-800 border-indigo-800 focus:border-indigo-500 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="text-indigo-400">
                Telefone
              </Label>
              <Input
                id="phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="bg-zinc-800 border-indigo-800 focus:border-indigo-500 text-white"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-indigo-400">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-zinc-800 border-indigo-800 focus:border-indigo-500 text-white"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-indigo-400">Data</Label>
              <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn(
                      "w-full justify-start text-left font-normal bg-zinc-800 border-indigo-800 hover:bg-zinc-700 hover:text-indigo-400",
                      !date && "text-zinc-400",
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4 text-indigo-500" />
                    {date ? (
                      format(date, "PPP", { locale: ptBR })
                    ) : (
                      <span>Selecione uma data</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-zinc-800 border border-indigo-800">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                      setDate(date);
                      setCalendarOpen(false);
                    }}
                    initialFocus
                    disabled={(date) =>
                      date < new Date(new Date().setHours(0, 0, 0, 0))
                    }
                    className="bg-zinc-800 text-white"
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="time" className="text-indigo-400">
                Horário
              </Label>
              <Select value={time} onValueChange={setTime} required>
                <SelectTrigger
                  id="time"
                  className="bg-zinc-800 border-indigo-800 focus:border-indigo-500 text-white hover:bg-zinc-700"
                >
                  <SelectValue placeholder="Selecione um horário" />
                </SelectTrigger>
                <SelectContent className="bg-zinc-800 border border-indigo-800 text-white">
                  {timeSlots.map((slot) => (
                    <SelectItem
                      key={slot}
                      value={slot}
                      className="hover:bg-indigo-900 focus:bg-indigo-900 focus:text-white"
                    >
                      <div className="flex items-center">
                        <Clock className="mr-2 h-4 w-4 text-indigo-500" />
                        {slot}
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="guests" className="text-indigo-400">
              Número de pessoas
            </Label>
            <Select value={guests} onValueChange={setGuests} required>
              <SelectTrigger
                id="guests"
                className="bg-zinc-800 border-indigo-800 focus:border-indigo-500 text-white hover:bg-zinc-700"
              >
                <SelectValue placeholder="Selecione o número de pessoas" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-800 border border-indigo-800 text-white">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <SelectItem
                    key={num}
                    value={num.toString()}
                    className="hover:bg-indigo-900 focus:bg-indigo-900 focus:text-white"
                  >
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4 text-indigo-500" />
                      {num} {num === 1 ? "pessoa" : "pessoas"}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="specialRequests" className="text-indigo-400">
              Solicitações especiais
            </Label>
            <Textarea
              id="specialRequests"
              value={specialRequests}
              onChange={(e) => setSpecialRequests(e.target.value)}
              className="bg-zinc-800 border-indigo-800 focus:border-indigo-500 text-white min-h-[100px]"
              placeholder="Informe qualquer solicitação especial (alergias, preferências, ocasião especial, etc.)"
            />
          </div>

          <div className="bg-indigo-900/30 border border-indigo-800 rounded-xl p-4 shadow-sm">
            <p className="text-sm text-indigo-300">
              Ao confirmar, você será redirecionado para o WhatsApp para
              finalizar sua reserva. Aguarde nossa confirmação por telefone ou
              email.
            </p>
          </div>

          <DialogFooter className="flex flex-col sm:flex-row gap-3 mt-5">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="w-full sm:w-auto border-indigo-800 hover:bg-indigo-900/30 text-white hover:text-indigo-400 transition-all duration-200"
            >
              Cancelar
            </Button>
            <Button
              type="submit"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white rounded-md shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center"
            >
              <Send className="mr-2 h-4 w-4" />
              Enviar Reserva via WhatsApp
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Reservation;
