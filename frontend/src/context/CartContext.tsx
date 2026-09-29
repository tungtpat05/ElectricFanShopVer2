import { createContext, useContext } from "react";
import { CartSummaryResponse } from "../types/cart";

export interface CartContextType {
  cart: CartSummaryResponse | null;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItemToCart: (variantId: number, quantity?: number) => Promise<CartSummaryResponse>;
  increaseCartItem: (variantId: number, quantity?: number) => Promise<CartSummaryResponse>;
  decreaseCartItem: (variantId: number, quantity?: number) => Promise<CartSummaryResponse>;
  removeCartItem: (variantId: number) => Promise<CartSummaryResponse>;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
};
