import React from "react";
import { Button } from "./ui/button";
import { PlusCircle, Eye, Star, Clock, Flame } from "lucide-react";
import { Card, CardContent, CardFooter } from "./ui/card";
import { motion } from "framer-motion";

interface MenuItemProps {
  id?: string;
  name?: string;
  description?: string;
  price?: number;
  image?: string;
  onAddToCart?: () => void;
  onViewDetails?: () => void;
  featured?: boolean;
  tags?: string[];
  prepTime?: string;
  spicyLevel?: number;
  rating?: number;
}

const MenuItem = ({
  id = "1",
  name = "Prato Delicioso",
  description = "Uma descrição saborosa deste prato especial do nosso restaurante.",
  price = 29.9,
  image = "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&q=80",
  onAddToCart = () => console.log("Item added to cart"),
  onViewDetails = () => console.log("View details clicked"),
  featured = false,
  tags = [],
  prepTime = "25 min",
  spicyLevel = 0,
  rating = 4.5,
}: MenuItemProps) => {
  return (
    <Card className="w-full max-w-[350px] h-[180px] overflow-hidden flex flex-row bg-black shadow-md hover:shadow-xl transition-all duration-300 rounded-xl border border-green-800 relative group">
      {featured && (
        <div className="absolute top-2 left-2 z-10 bg-green-600 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center">
          <Star className="h-3 w-3 mr-1 fill-white" />
          Destaque
        </div>
      )}
      <div
        className="w-1/3 bg-cover bg-center relative overflow-hidden transition-all duration-500 group-hover:w-2/5"
        style={{ backgroundImage: `url(${image})` }}
        onClick={onViewDetails}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            className="bg-green-800/80 rounded-full p-2"
          >
            <Eye className="h-5 w-5 text-white" />
          </motion.div>
        </div>
      </div>
      <div className="w-2/3 flex flex-col justify-between transition-all duration-500 group-hover:w-3/5">
        <CardContent className="p-4">
          <div className="flex justify-between items-start">
            <h3
              className="text-lg font-semibold truncate cursor-pointer text-white hover:text-green-400 transition-colors duration-200 flex-1"
              onClick={onViewDetails}
            >
              {name}
            </h3>
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-3 w-3 ${i < Math.floor(rating) ? "text-green-500 fill-green-500" : "text-gray-600"}`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-400 line-clamp-2 mt-1">
            {description}
          </p>

          <div className="flex items-center gap-3 mt-2">
            <div className="flex items-center text-xs text-gray-300">
              <Clock className="h-3 w-3 mr-1 text-green-500" />
              {prepTime}
            </div>
            {spicyLevel > 0 && (
              <div className="flex items-center text-xs text-gray-300">
                <Flame className="h-3 w-3 mr-1 text-green-500" />
                {[...Array(3)].map((_, i) => (
                  <Flame
                    key={i}
                    className={`h-2 w-2 ${i < spicyLevel ? "text-green-500" : "text-gray-700"}`}
                  />
                ))}
              </div>
            )}
          </div>

          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {tags.slice(0, 2).map((tag, index) => (
                <span
                  key={index}
                  className="text-xs bg-green-900/50 text-green-400 px-2 py-0.5 rounded-full border border-green-800"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 2 && (
                <span className="text-xs text-gray-400">
                  +{tags.length - 2}
                </span>
              )}
            </div>
          )}

          <p className="text-lg font-bold mt-2 text-green-400">
            R$ {price.toFixed(2)}
          </p>
        </CardContent>
        <CardFooter className="p-3 pt-0 flex justify-end gap-2">
          <Button
            size="sm"
            variant="outline"
            onClick={onViewDetails}
            className="border-green-800 text-green-400 hover:bg-green-900/30 hover:border-green-700 rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            size="sm"
            onClick={onAddToCart}
            className="bg-green-600 hover:bg-green-700 text-white rounded-full transition-all duration-200 transform hover:scale-105"
          >
            <PlusCircle className="mr-1 h-4 w-4" />
            Adicionar
          </Button>
        </CardFooter>
      </div>
    </Card>
  );
};

export default MenuItem;
