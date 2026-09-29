import { axiosClient } from "../lib/axiosClient";
import {
  CartSummaryResponse,
  AddToCartRequest,
  AdjustCartItemQuantityRequest,
} from "../types/cart";

export const getCart = async (): Promise<CartSummaryResponse> => {
  const response = await axiosClient.get<CartSummaryResponse>("/cart");
  return response.data;
};

export const addToCart = async (payload: AddToCartRequest): Promise<CartSummaryResponse> => {
  const response = await axiosClient.post<CartSummaryResponse>("/cart/items", payload);
  return response.data;
};

export const increaseQuantity = async (payload: AdjustCartItemQuantityRequest): Promise<CartSummaryResponse> => {
  const response = await axiosClient.patch<CartSummaryResponse>("/cart/items/increase", payload);
  return response.data;
};

export const decreaseQuantity = async (payload: AdjustCartItemQuantityRequest): Promise<CartSummaryResponse> => {
  const response = await axiosClient.patch<CartSummaryResponse>("/cart/items/decrease", payload);
  return response.data;
};

export const removeFromCart = async (variantId: number): Promise<CartSummaryResponse> => {
  const response = await axiosClient.delete<CartSummaryResponse>(`/cart/items/${variantId}`);
  return response.data;
};
