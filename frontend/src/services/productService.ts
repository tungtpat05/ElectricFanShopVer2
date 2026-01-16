import { axiosClient } from "../lib/axiosClient";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products");
  return response.data;
}   