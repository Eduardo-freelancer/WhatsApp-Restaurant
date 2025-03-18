import React, { useState } from "react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  Star,
  Clock,
  ShoppingBag,
  Utensils,
  ChefHat,
  Award,
  Calendar,
  Sparkles,
  Leaf,
  Coffee,
  Instagram,
  Facebook,
  Twitter,
  Send,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { Badge } from "./ui/badge";
import Reservation from "./Reservation";

const LandingPage = () => {
  const [isReservationOpen, setIsReservationOpen] = useState(false);

  const handleReservationSubmit = (data: any) => {
    console.log("Reservation data:", data);
    // Here you would typically send this data to your backend
  };

  return (
    <div className="min-h-screen bg-black text-white font-sans">
      {/* Hero Section */}
      <div className="relative overflow-hidden h-[90vh] min-h-[600px]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 to-black/80 z-10" />
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1920&q=80')",
          }}
        />
        <div className="relative z-20 container mx-auto px-6 py-24 md:py-32 flex flex-col items-center text-center h-full justify-center">
          <Badge className="bg-green-900/50 text-green-400 border-green-800 px-4 py-1.5 mb-8 text-sm">
            Experiência Gastronômica Premium
          </Badge>
          <h1 className="text-4xl md:text-7xl font-bold text-white mb-6 leading-tight flex flex-col items-center justify-center">
            <span className="flex items-center">
              <ChefHat className="h-12 w-12 mr-3 text-green-500" /> Restaurante
            </span>
            <span className="text-green-500">Delícia</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-10 max-w-2xl">
            Sabores autênticos da culinária italiana com ingredientes frescos e
            receitas tradicionais em um ambiente sofisticado
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-md px-8 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/menu">
                Ver Cardápio <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-green-600 text-green-500 hover:bg-green-900/30 rounded-md px-8 text-lg font-medium"
              onClick={() => setIsReservationOpen(true)}
            >
              <Calendar className="mr-2 h-5 w-5" /> Fazer Reserva
            </Button>
          </div>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center animate-bounce">
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
              className="text-white hover:text-green-400 transition-colors duration-200 bg-green-900/50 p-2 rounded-full"
              aria-label="Rolar para baixo"
            >
              <ArrowRight className="h-6 w-6 transform rotate-90" />
            </button>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="container mx-auto px-6 py-24 bg-black">
        <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-16 flex flex-col items-center justify-center">
          Por que escolher o{" "}
          <span className="text-green-500 mt-2 flex items-center">
            Restaurante Delícia{" "}
            <Sparkles className="h-8 w-8 ml-2 text-green-400" />
          </span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-green-900/20 transition-all duration-300 border border-green-900 hover:border-green-800 flex flex-col items-center text-center group hover:translate-y-[-5px]">
            <div className="bg-green-900/50 p-4 rounded-full mb-6 group-hover:bg-green-800/50 transition-colors duration-300">
              <Utensils className="h-8 w-8 text-green-500 group-hover:text-green-400 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">
              Culinária Autêntica
            </h3>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
              Receitas tradicionais italianas preparadas com técnicas autênticas
              e ingredientes selecionados.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-green-900/20 transition-all duration-300 border border-green-900 hover:border-green-800 flex flex-col items-center text-center group hover:translate-y-[-5px]">
            <div className="bg-green-900/50 p-4 rounded-full mb-6 group-hover:bg-green-800/50 transition-colors duration-300">
              <Clock className="h-8 w-8 text-green-500 group-hover:text-green-400 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">
              Pedido Rápido
            </h3>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
              Faça seu pedido online e receba em casa ou retire no local com
              praticidade e rapidez.
            </p>
          </div>

          <div className="bg-gray-900 p-8 rounded-xl shadow-md hover:shadow-green-900/20 transition-all duration-300 border border-green-900 hover:border-green-800 flex flex-col items-center text-center group hover:translate-y-[-5px]">
            <div className="bg-green-900/50 p-4 rounded-full mb-6 group-hover:bg-green-800/50 transition-colors duration-300">
              <Star className="h-8 w-8 text-green-500 group-hover:text-green-400 transition-colors duration-300" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-white group-hover:text-green-400 transition-colors duration-300">
              Experiência Premium
            </h3>
            <p className="text-gray-300 group-hover:text-gray-100 transition-colors duration-300">
              Ambiente acolhedor, atendimento personalizado e pratos preparados
              com excelência.
            </p>
          </div>
        </div>
      </div>

      {/* Menu Preview Section */}
      <div className="bg-gray-950 py-20">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-5xl font-bold text-center text-white mb-6">
            Conheça Nosso <span className="text-green-500">Cardápio</span>
          </h2>
          <p className="text-center text-gray-300 mb-12 max-w-2xl mx-auto">
            Uma seleção de pratos preparados com ingredientes frescos e técnicas
            tradicionais italianas
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Menu Item Preview 1 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-green-900/20 transition-all duration-300 transform hover:scale-[1.02] border border-green-900 hover:border-green-800 group">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="https://images.unsplash.com/photo-1595295333158-4742f28fbd85?w=500&q=80"
                  alt="Risoto de Funghi"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <Badge className="absolute top-3 right-3 z-20 bg-green-900/80 text-green-400 border-green-800">
                  <Leaf className="h-3 w-3 mr-1" /> Vegetariano
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors duration-200">
                  Risoto de Funghi
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-100 transition-colors duration-200">
                  Arroz arbóreo cremoso com mix de cogumelos e parmesão
                </p>
                <p className="text-lg font-bold text-green-500 mb-4 group-hover:text-green-400 transition-colors duration-200">
                  R$ 48,90
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to="/menu">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Ver no Cardápio
                  </Link>
                </Button>
              </div>
            </div>

            {/* Menu Item Preview 2 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-green-900/20 transition-all duration-300 transform hover:scale-[1.02] border border-green-900 hover:border-green-800 group">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="https://images.unsplash.com/photo-1600891964092-4316c288032e?w=500&q=80"
                  alt="Filé Mignon ao Molho Madeira"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <Badge className="absolute top-3 right-3 z-20 bg-green-900/80 text-green-400 border-green-800">
                  <Star className="h-3 w-3 mr-1" /> Premium
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors duration-200">
                  Filé Mignon ao Molho Madeira
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-100 transition-colors duration-200">
                  Filé mignon grelhado com molho madeira e batatas rústicas
                </p>
                <p className="text-lg font-bold text-green-500 mb-4 group-hover:text-green-400 transition-colors duration-200">
                  R$ 59,90
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to="/menu">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Ver no Cardápio
                  </Link>
                </Button>
              </div>
            </div>

            {/* Menu Item Preview 3 */}
            <div className="bg-gray-900 rounded-xl overflow-hidden shadow-md hover:shadow-green-900/20 transition-all duration-300 transform hover:scale-[1.02] border border-green-900 hover:border-green-800 group">
              <div className="h-56 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <img
                  src="https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=500&q=80"
                  alt="Tiramisu"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <Badge className="absolute top-3 right-3 z-20 bg-green-900/80 text-green-400 border-green-800">
                  <Coffee className="h-3 w-3 mr-1" /> Sobremesa
                </Badge>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors duration-200">
                  Tiramisu
                </h3>
                <p className="text-gray-300 mb-4 line-clamp-2 group-hover:text-gray-100 transition-colors duration-200">
                  Sobremesa italiana com café, queijo mascarpone e cacau
                </p>
                <p className="text-lg font-bold text-green-500 mb-4 group-hover:text-green-400 transition-colors duration-200">
                  R$ 24,90
                </p>
                <Button
                  asChild
                  className="w-full bg-green-600 hover:bg-green-700 text-white rounded-md py-2 font-medium shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Link to="/menu">
                    <ShoppingBag className="mr-2 h-4 w-4" /> Ver no Cardápio
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Button
              asChild
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white rounded-md px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Link to="/menu">
                Ver Cardápio Completo <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="container mx-auto px-6 py-20">
        <div className="bg-gradient-to-r from-green-900 to-green-800 rounded-xl overflow-hidden shadow-xl">
          <div className="md:flex">
            <div className="md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                Faça seu pedido agora mesmo!
              </h2>
              <p className="text-green-100 mb-8 text-lg">
                Experimente nossos pratos deliciosos no conforto da sua casa.
                Pedido rápido e entrega eficiente via WhatsApp.
              </p>
              <Button
                asChild
                size="lg"
                className="bg-white text-green-800 hover:bg-green-100 rounded-md px-8 py-6 text-lg font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 w-full md:w-auto"
              >
                <Link to="/menu">
                  Fazer Pedido <ShoppingBag className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <div className="md:w-1/2 relative min-h-[300px] md:min-h-0">
              <img
                src="https://images.unsplash.com/photo-1498579809087-ef1e558fd1da?w=800&q=80"
                alt="Comida italiana"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-950 text-white py-16 border-t border-green-900">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-900/50 p-1 flex items-center justify-center shadow-md border border-green-800">
                  <ChefHat className="h-8 w-8 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold">Restaurante Delícia</h3>
              </div>
              <p className="text-gray-300 mb-6 max-w-md">
                Sabores autênticos da culinária italiana com ingredientes
                frescos e receitas tradicionais em um ambiente sofisticado e
                acolhedor.
              </p>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 transition-colors duration-200"
                >
                  <Instagram className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 transition-colors duration-200"
                >
                  <Facebook className="h-6 w-6" />
                </a>
                <a
                  href="#"
                  className="text-green-500 hover:text-green-400 transition-colors duration-200"
                >
                  <Twitter className="h-6 w-6" />
                </a>
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">
                Horário de Funcionamento
              </h3>
              <ul className="space-y-2">
                <li className="flex justify-between">
                  <span className="text-gray-300">Segunda a Sexta:</span>
                  <span>11h às 23h</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Sábados:</span>
                  <span>11h às 00h</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Domingos:</span>
                  <span>11h às 22h</span>
                </li>
                <li className="flex justify-between">
                  <span className="text-gray-300">Feriados:</span>
                  <span>12h às 22h</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-bold mb-4 text-green-400">Contato</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <MapPin className="h-5 w-5 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                  <span>
                    Rua das Flores, 123 - Centro
                    <br />
                    São Paulo - SP
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="h-5 w-5 text-green-500 mr-2" />
                  <span>(11) 5555-5555</span>
                </li>
                <li className="flex items-center">
                  <Mail className="h-5 w-5 text-green-500 mr-2" />
                  <span>contato@restaurantedelicia.com.br</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-green-900 mt-12 pt-8 text-center text-gray-300">
            <p>© 2023 Restaurante Delícia. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      <Reservation
        isOpen={isReservationOpen}
        onClose={() => setIsReservationOpen(false)}
        onSubmit={handleReservationSubmit}
      />
    </div>
  );
};

export default LandingPage;
