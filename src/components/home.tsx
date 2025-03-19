import React, { useState, useEffect } from "react";
import { ShoppingBag } from "lucide-react";
import Header from "./Header";
import MenuCategories from "./MenuCategories";
import MenuItems from "./MenuItems";
import Cart from "./Cart";
import ItemDetailModal from "./ItemDetailModal";
import OrderSummary from "./OrderSummary";
import { Button } from "./ui/button";
import { MenuItem, menuItems } from "./MenuData";

const Home = () => {
  const [selectedCategory, setSelectedCategory] = useState("entradas");
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isOrderSummaryOpen, setIsOrderSummaryOpen] = useState(false);
  const [isMobileCartOpen, setIsMobileCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<
    Array<{
      id: string;
      name: string;
      price: number;
      quantity: number;
      customizations?: string[];
      image?: string;
    }>
  >([]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
  };

  const handleItemClick = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleAddToCartFromModal = (
    item: MenuItem,
    quantity: number,
    customizations?: string[],
  ) => {
    // Check if item with same customizations already exists in cart
    const existingItemIndex = cartItems.findIndex(
      (cartItem) =>
        cartItem.id === item.id &&
        JSON.stringify(cartItem.customizations) ===
          JSON.stringify(customizations),
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += quantity;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: quantity,
          customizations: customizations,
          image: item.image,
        },
      ]);
    }
  };

  const handleAddToCartDirect = (item: MenuItem) => {
    // Add item directly to cart with quantity 1 and no customizations
    const existingItemIndex = cartItems.findIndex(
      (cartItem) => cartItem.id === item.id && !cartItem.customizations,
    );

    if (existingItemIndex !== -1) {
      // Update quantity if item exists
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += 1;
      setCartItems(updatedCartItems);
    } else {
      // Add new item to cart
      setCartItems([
        ...cartItems,
        {
          id: item.id,
          name: item.name,
          price: item.price,
          quantity: 1,
          image: item.image,
        },
      ]);
    }
  };

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const updatedCartItems = cartItems.map((item) =>
      item.id === id ? { ...item, quantity } : item,
    );
    setCartItems(updatedCartItems);
  };

  const handleRemoveItem = (id: string) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCartItems);
  };

  const handleCheckout = () => {
    setIsOrderSummaryOpen(true);
  };

  const handleConfirmOrder = () => {
    // Create WhatsApp message
    const message = encodeURIComponent(
      `*Novo Pedido*\n\n${cartItems
        .map(
          (item) =>
            `${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}${item.customizations ? `\n   _${item.customizations.join(", ")}_` : ""}`,
        )
        .join(
          "\n",
        )}\n\n*Total: R$ ${cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2)}*`,
    );

    // Open WhatsApp with the message
    window.open(`https://wa.me/?text=${message}`, "_blank");

    // Close the order summary modal
    setIsOrderSummaryOpen(false);
    // Clear cart after order is placed
    setCartItems([]);
  };

  const toggleMobileCart = () => {
    setIsMobileCartOpen(!isMobileCartOpen);
  };

  return (
    <div className="flex flex-col min-h-screen bg-zinc-900">
      <Header
        restaurantName="Restaurante Delícia"
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onCartClick={toggleMobileCart}
      />

      <main className="flex flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col overflow-hidden">
          <MenuCategories
            activeCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />

          <div className="flex-1 overflow-y-auto">
            <MenuItems
              selectedCategory={selectedCategory}
              onItemClick={handleItemClick}
              onAddToCart={handleAddToCartDirect}
              items={menuItems}
            />
          </div>
        </div>

        {/* Desktop Cart - always visible on larger screens */}
        <div className="hidden md:block w-[400px]">
          <Cart
            items={cartItems}
            onCheckout={handleCheckout}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
          />
        </div>

        {/* Mobile Cart - shown when toggled */}
        <div
          className={`fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm z-40 md:hidden transition-all duration-300 ${isMobileCartOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
          onClick={toggleMobileCart}
        >
          <div
            className={`absolute right-0 top-0 bottom-0 w-full max-w-[400px] transition-transform duration-500 ease-in-out ${isMobileCartOpen ? "translate-x-0" : "translate-x-full"}`}
            onClick={(e) => e.stopPropagation()}
          >
            <Cart
              items={cartItems}
              onCheckout={handleCheckout}
              onUpdateQuantity={handleUpdateQuantity}
              onRemoveItem={handleRemoveItem}
            />
          </div>
        </div>
      </main>

      {/* Floating Cart Button for Mobile */}
      <div className="fixed bottom-6 right-6 md:hidden z-30">
        <Button
          onClick={toggleMobileCart}
          className="h-14 w-14 rounded-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
        >
          <ShoppingBag className="h-6 w-6" />
          {cartItems.length > 0 && (
            <span className="absolute -top-2 -right-2 bg-white text-indigo-600 rounded-full h-6 w-6 flex items-center justify-center text-sm font-bold border-2 border-indigo-600">
              {cartItems.reduce((sum, item) => sum + item.quantity, 0)}
            </span>
          )}
        </Button>
      </div>

      {/* Item Detail Modal */}
      {selectedItem && (
        <ItemDetailModal
          item={selectedItem}
          isOpen={isDetailModalOpen}
          onClose={() => setIsDetailModalOpen(false)}
          onAddToCart={handleAddToCartFromModal}
        />
      )}

      {/* Order Summary Modal */}
      <OrderSummary
        isOpen={isOrderSummaryOpen}
        onClose={() => setIsOrderSummaryOpen(false)}
        items={cartItems}
        onConfirm={handleConfirmOrder}
        onCancel={() => setIsOrderSummaryOpen(false)}
      />
    </div>
  );
};

export default Home;
