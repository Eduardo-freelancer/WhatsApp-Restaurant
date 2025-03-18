import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ScrollArea } from "./ui/scroll-area";
import { Input } from "./ui/input";
import {
  Search,
  Coffee,
  Utensils,
  Wine,
  IceCream,
  Star,
  Filter,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";

// Using the MenuItem interface from MenuData
import { MenuItem as MenuItemType } from "./MenuData";

interface MenuItemProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  tags?: string[];
  featured?: boolean;
}

interface MenuItemsProps {
  selectedCategory?: string;
  onItemClick?: (item: MenuItemType) => void;
  onAddToCart?: (item: MenuItemType) => void;
  items?: MenuItemType[];
}

const MenuItems = ({
  selectedCategory = "entradas",
  onItemClick = () => {},
  onAddToCart = () => {},
  items = [
    {
      id: "1",
      name: "Bruschetta Italiana",
      description:
        "Pão italiano tostado com tomate, manjericão e azeite de oliva",
      price: 18.9,
      image:
        "https://images.unsplash.com/photo-1572695157366-5e585ab2b69f?w=400&q=80",
      category: "entradas",
      tags: ["vegetariano", "popular"],
      featured: true,
    },
    {
      id: "2",
      name: "Carpaccio",
      description: "Finas fatias de carne crua com molho especial e alcaparras",
      price: 32.9,
      image:
        "https://images.unsplash.com/photo-1608835291093-394b0c943a75?w=400&q=80",
      category: "entradas",
      tags: ["carne", "gourmet"],
    },
    {
      id: "3",
      name: "Filé Mignon ao Molho Madeira",
      description: "Filé mignon grelhado com molho madeira e batatas rústicas",
      price: 59.9,
      image:
        "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=400&q=80",
      category: "principais",
      tags: ["carne", "premium"],
      featured: true,
    },
    {
      id: "4",
      name: "Risoto de Funghi",
      description: "Arroz arbóreo cremoso com mix de cogumelos e parmesão",
      price: 48.9,
      image:
        "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=400&q=80",
      category: "principais",
      tags: ["vegetariano", "gourmet"],
    },
    {
      id: "5",
      name: "Vinho Tinto",
      description: "Garrafa de vinho tinto seco importado",
      price: 89.9,
      image:
        "https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?w=400&q=80",
      category: "bebidas",
      tags: ["alcoólico", "premium"],
    },
    {
      id: "6",
      name: "Suco Natural",
      description: "Suco de frutas frescas sem adição de açúcar",
      price: 12.9,
      image:
        "https://images.unsplash.com/photo-1613478223719-2ab802602423?w=400&q=80",
      category: "bebidas",
      tags: ["saudável", "sem álcool"],
    },
    {
      id: "7",
      name: "Tiramisu",
      description: "Sobremesa italiana com café, queijo mascarpone e cacau",
      price: 24.9,
      image:
        "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&q=80",
      category: "sobremesas",
      tags: ["doce", "popular"],
      featured: true,
    },
    {
      id: "8",
      name: "Cheesecake",
      description: "Torta de cream cheese com calda de frutas vermelhas",
      price: 22.9,
      image:
        "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=400&q=80",
      category: "sobremesas",
      tags: ["doce", "frutas"],
    },
    {
      id: "9",
      name: "Lasanha à Bolonhesa",
      description:
        "Camadas de massa intercaladas com molho bolonhesa e bechamel",
      price: 45.9,
      image:
        "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?w=400&q=80",
      category: "principais",
      tags: ["carne", "popular"],
    },
    {
      id: "10",
      name: "Salada Caesar",
      description: "Alface romana, croutons, parmesão e molho caesar",
      price: 28.9,
      image:
        "https://images.unsplash.com/photo-1550304943-4f24f54ddde9?w=400&q=80",
      category: "entradas",
      tags: ["saudável", "leve"],
    },
    {
      id: "11",
      name: "Água com Gás",
      description: "Água mineral gaseificada",
      price: 6.9,
      image:
        "https://images.unsplash.com/photo-1564601455749-529801a87863?w=400&q=80",
      category: "bebidas",
      tags: ["sem álcool"],
    },
    {
      id: "12",
      name: "Mousse de Chocolate",
      description: "Mousse de chocolate belga com raspas de chocolate",
      price: 18.9,
      image:
        "https://images.unsplash.com/photo-1511715282680-fbf93a50e721?w=400&q=80",
      category: "sobremesas",
      tags: ["chocolate", "doce"],
    },
  ],
}) => {
  const [filteredItems, setFilteredItems] = useState<MenuItemType[]>([]);
  const [activeCategory, setActiveCategory] = useState(selectedCategory);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setActiveCategory(selectedCategory);
  }, [selectedCategory]);

  useEffect(() => {
    let result = items.filter((item) => item.category === activeCategory);

    // Apply search filter if there's a search term
    if (searchTerm.trim() !== "") {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (item) =>
          item.name.toLowerCase().includes(term) ||
          item.description.toLowerCase().includes(term) ||
          (item.tags &&
            item.tags.some((tag) => tag.toLowerCase().includes(term))),
      );
    }

    // Apply tag filter if active
    if (activeFilter) {
      result = result.filter(
        (item) => item.tags && item.tags.includes(activeFilter),
      );
    }

    setFilteredItems(result);
  }, [activeCategory, items, searchTerm, activeFilter]);

  const handleItemClick = (item: MenuItemType) => {
    onItemClick(item);
  };

  const handleAddToCart = (item: MenuItemType) => {
    onAddToCart(item);
  };

  const categories = [
    {
      id: "entradas",
      name: "Entradas",
      icon: <Utensils className="h-4 w-4 mr-2" />,
    },
    {
      id: "principais",
      name: "Pratos Principais",
      icon: <Utensils className="h-4 w-4 mr-2" />,
    },
    {
      id: "bebidas",
      name: "Bebidas",
      icon: <Coffee className="h-4 w-4 mr-2" />,
    },
    {
      id: "sobremesas",
      name: "Sobremesas",
      icon: <IceCream className="h-4 w-4 mr-2" />,
    },
  ];

  // Get all unique tags from the current category
  const availableTags = Array.from(
    new Set(
      items
        .filter((item) => item.category === activeCategory)
        .flatMap((item) => item.tags || []),
    ),
  );

  return (
    <div className="w-full bg-gradient-to-b from-indigo-950/90 to-zinc-900 p-4 md:p-6">
      <div className="mb-6 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-indigo-400 h-4 w-4" />
          <Input
            placeholder="Buscar no cardápio..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 border-indigo-700 focus:border-indigo-500 rounded-full bg-zinc-900/80 text-white"
          />
        </div>
        <Button
          variant="outline"
          className="md:w-auto w-full border-indigo-700 text-indigo-400 hover:bg-indigo-900/50 hover:text-indigo-300"
          onClick={() => setShowFilters(!showFilters)}
        >
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      <Tabs
        defaultValue={activeCategory}
        value={activeCategory}
        onValueChange={setActiveCategory}
        className="w-full"
      >
        <TabsList className="w-full mb-6 bg-zinc-900 rounded-full p-1 shadow-md border border-indigo-800 overflow-x-auto flex-nowrap">
          {categories.map((category) => (
            <TabsTrigger
              key={category.id}
              value={category.id}
              className="flex-1 rounded-full data-[state=active]:bg-indigo-700 data-[state=active]:text-white data-[state=active]:shadow-md transition-all duration-300 py-2.5 flex items-center justify-center text-indigo-400 whitespace-nowrap"
            >
              {category.icon}
              {category.name}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Tags filter */}
        {showFilters && availableTags.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="flex flex-wrap gap-2 mb-6 bg-zinc-900/50 p-3 rounded-lg border border-indigo-900/50"
          >
            {availableTags.map((tag) => (
              <button
                key={tag}
                onClick={() =>
                  setActiveFilter(activeFilter === tag ? null : tag)
                }
                className={`px-3 py-1 rounded-full text-sm font-medium transition-colors duration-200 ${activeFilter === tag ? "bg-indigo-700 text-white" : "bg-zinc-900 text-indigo-400 border border-indigo-700 hover:bg-indigo-900"}`}
              >
                {tag}
              </button>
            ))}
            {activeFilter && (
              <button
                onClick={() => setActiveFilter(null)}
                className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-950 text-indigo-300 hover:bg-indigo-900 transition-colors duration-200"
              >
                Limpar filtros
              </button>
            )}
          </motion.div>
        )}

        {categories.map((category) => (
          <TabsContent
            key={category.id}
            value={category.id}
            className="mt-0 animate-in fade-in-50 duration-300"
          >
            {/* Featured items section */}
            {filteredItems.some((item) => item.featured) &&
              searchTerm === "" &&
              !activeFilter && (
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-4 flex items-center">
                    <Star className="h-5 w-5 text-indigo-400 mr-2" />
                    Destaques {category.name}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredItems
                      .filter((item) => item.featured)
                      .map((item) => (
                        <motion.div
                          key={`featured-${item.id}`}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="transform hover:scale-[1.02] transition-all duration-300"
                        >
                          <MenuItem
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            onViewDetails={() => handleItemClick(item)}
                            onAddToCart={() => handleAddToCart(item)}
                          />
                        </motion.div>
                      ))}
                  </div>
                </div>
              )}

            <ScrollArea className="h-[calc(100vh-300px)] md:h-[600px] pr-4">
              {filteredItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <Search className="h-12 w-12 text-indigo-600 mb-4" />
                  <h3 className="text-lg font-medium mb-2 text-white">
                    Nenhum item encontrado
                  </h3>
                  <p className="text-indigo-400 mb-4">
                    Tente ajustar sua busca ou filtros
                  </p>
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setActiveFilter(null);
                    }}
                    className="text-indigo-500 font-medium hover:underline"
                  >
                    Limpar filtros
                  </button>
                </div>
              ) : (
                <AnimatePresence>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                    {filteredItems
                      .filter(
                        (item) =>
                          searchTerm !== "" ||
                          activeFilter !== null ||
                          !item.featured,
                      )
                      .map((item) => (
                        <motion.div
                          key={item.id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.3 }}
                          className="transform hover:scale-[1.02] transition-all duration-300"
                        >
                          <MenuItem
                            id={item.id}
                            name={item.name}
                            description={item.description}
                            price={item.price}
                            image={item.image}
                            onViewDetails={() => handleItemClick(item)}
                            onAddToCart={() => handleAddToCart(item)}
                          />
                        </motion.div>
                      ))}
                  </div>
                </AnimatePresence>
              )}
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default MenuItems;
