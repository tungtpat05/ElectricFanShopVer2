import { Color } from "./color";

export interface CartItemResponse {
  id: number;
  productId: number;
  variantId: number;
  productName: string;
  thumbnail?: string;
  sku?: string;
  variantImage?: string;
  color?: Color;
  unitPrice: number;
  quantity: number;
  lineTotal: number;
}

export interface CartSummaryResponse {
  cartId: number;
  userId: number;
  totalQuantity: number;
  totalPrice: number;
  items: CartItemResponse[];
}

export interface AddToCartRequest {
  variantId: number;
  quantity: number;
}

export interface AdjustCartItemQuantityRequest {
  variantId: number;
  quantity: number;
}
