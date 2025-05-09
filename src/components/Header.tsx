import React, { useState } from "react";
import { ShoppingCart, Menu, Calendar, ChefHat, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import Reservation from "./Reservation";
import { Link } from "react-router-dom";

interface HeaderProps {
  restaurantName?: string;
  logoUrl?: string;
  cartItemCount?: number;
  onCartClick?: () => void;
  onMenuClick?: () => void;
}

const Header = ({
  restaurantName = "Restaurante Delícia",
  logoUrl = "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=100&q=80",
  cartItemCount = 0,
  onCartClick = () => {},
  onMenuClick = () => {},
}: HeaderProps) => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  const handleReservationSubmit = (data: any) => {
    console.log("Reservation data:", data);
    // Here you would typically send this data to your backend
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-black/40 backdrop-blur-md border-b border-white/10 shadow-md">
      <div className="container flex items-center justify-between h-16 sm:h-20 px-3 sm:px-4 mx-auto">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMenuClick}
            className="md:hidden text-white/80 hover:text-white hover:bg-white/10"
          >
            <Menu className="w-5 h-5" />
          </Button>

          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-white/5 p-1 flex items-center justify-center shadow-md border border-white/10 overflow-hidden">
              <img
                src={logoUrl}
                alt="Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h1 className="text-base sm:text-xl font-bold text-white tracking-tight flex items-center">
                {restaurantName}
                <ChefHat className="ml-1 sm:ml-2 h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
              </h1>
              <p className="text-[10px] sm:text-xs text-white/70 hidden sm:block">
                Sabores autênticos da culinária italiana
              </p>
            </div>
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="text-white/80 hover:text-white hover:bg-white/10 hidden lg:flex"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5" />
            ) : (
              <Moon className="w-5 h-5" />
            )}
          </Button>

          <Button
            variant="outline"
            className="relative border-white/20 hover:border-white/30 hover:bg-white/10 transition-all duration-200 text-white hidden md:flex text-xs sm:text-sm py-1 h-8 sm:h-10 backdrop-blur-sm"
            onClick={() => setIsReservationOpen(true)}
          >
            <Calendar className="w-4 h-4 mr-1 sm:mr-2 text-white/80" />
            <span>Reservar</span>
          </Button>

          <Button
            variant="outline"
            className="relative rounded-md border-white/20 hover:border-white/30 hover:bg-white/10 transition-all duration-200 px-2 sm:px-4 text-white text-xs sm:text-sm py-1 h-8 sm:h-10 backdrop-blur-sm"
            onClick={onCartClick}
          >
            <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5 mr-1 sm:mr-2 text-white/80" />
            <span className="hidden sm:inline">Carrinho</span>
            {cartItemCount > 0 && (
              <Badge className="absolute -top-2 -right-2 px-1.5 py-0.5 text-xs bg-white/20 hover:bg-white/30 border border-white/10">
                {cartItemCount}
              </Badge>
            )}
          </Button>
        </div>
      </div>

      <Reservation
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onSubmit={handleReservationSubmit}
      />
    </header>
  );
};

export default Header;
