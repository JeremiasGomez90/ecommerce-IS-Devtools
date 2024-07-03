import { ReactNode, createContext, useEffect, useState } from "react";

export interface CartContextType {
  productsInCart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
  decrementQuantity: (product: Product) => void;
  incrementQuantity: (product: Product) => void;
  totalPrice: number;
  clearCart: () => void;
}

export const CartContext = createContext<CartContextType | undefined>(
  undefined
);

export const CartProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [productsInCart, setProductsInCart] = useState<Product[]>(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  function addToCart(product: Product) {
    setProductsInCart((prev) => [...prev, product]);
  }

  function removeFromCart(id: number) {
    setProductsInCart((prev) => prev.filter((p) => p.id !== id));
  }

  function decrementQuantity(product: Product) {
    setProductsInCart((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity - 1 } : p
      )
    );
  }

  function incrementQuantity(product: Product) {
    setProductsInCart((prev) =>
      prev.map((p) =>
        p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
      )
    );
  }

  function clearCart() {
    setProductsInCart([]);
  }

  const value = {
    productsInCart,
    addToCart,
    removeFromCart,
    decrementQuantity,
    incrementQuantity,
    totalPrice: 0,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
