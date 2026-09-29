import { useEffect, useState, useCallback, ReactNode } from "react";
import { CartContext, CartContextType } from "./CartContext";
import { CartSummaryResponse } from "../types/cart";
import { useAuth } from "./AuthContext";
import {
  getCart,
  addToCart as addToCartAPI,
  increaseQuantity as increaseQuantityAPI,
  decreaseQuantity as decreaseQuantityAPI,
  removeFromCart as removeFromCartAPI,
} from "../services/cartService";

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const { isLogin, loading: authLoading } = useAuth();
  const [cart, setCart] = useState<CartSummaryResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCart = useCallback(async () => {
    if (!isLogin) {
      setCart(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = await getCart();
      setCart(data);
    } catch (err: any) {
      console.error("Error fetching cart:", err);
      setError(err?.response?.data?.message || "Failed to load cart");
    } finally {
      setLoading(false);
    }
  }, [isLogin]);

  useEffect(() => {
    if (!authLoading) {
      if (isLogin) {
        fetchCart();
      } else {
        setCart(null);
      }
    }
  }, [isLogin, authLoading, fetchCart]);

  const addItemToCart = async (variantId: number, quantity: number = 1): Promise<CartSummaryResponse> => {
    try {
      const updated = await addToCartAPI({ variantId, quantity });
      setCart(updated);
      return updated;
    } catch (err: any) {
      console.error("Error adding to cart:", err);
      throw err;
    }
  };

  const increaseCartItem = async (variantId: number, quantity: number = 1): Promise<CartSummaryResponse> => {
    try {
      const updated = await increaseQuantityAPI({ variantId, quantity });
      setCart(updated);
      return updated;
    } catch (err: any) {
      console.error("Error increasing cart quantity:", err);
      throw err;
    }
  };

  const decreaseCartItem = async (variantId: number, quantity: number = 1): Promise<CartSummaryResponse> => {
    try {
      const updated = await decreaseQuantityAPI({ variantId, quantity });
      setCart(updated);
      return updated;
    } catch (err: any) {
      console.error("Error decreasing cart quantity:", err);
      throw err;
    }
  };

  const removeCartItem = async (variantId: number): Promise<CartSummaryResponse> => {
    try {
      const updated = await removeFromCartAPI(variantId);
      setCart(updated);
      return updated;
    } catch (err: any) {
      console.error("Error removing item from cart:", err);
      throw err;
    }
  };

  const value: CartContextType = {
    cart,
    loading,
    error,
    fetchCart,
    addItemToCart,
    increaseCartItem,
    decreaseCartItem,
    removeCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
