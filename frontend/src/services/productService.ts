import { axiosClient } from "../lib/axiosClient";
import { Product } from "../types/product";

export const getProducts = async (): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products");
  return response.data;
};

export const getProductById = async (id: number): Promise<Product> => {
  const response = await axiosClient.get<Product>(`/products/${id}`);
  return response.data;
};

export const getProductsByCategory = async (categoryId: number): Promise<Product[]> => {
  const response = await axiosClient.get<Product[]>("/products", {
    params: { categoryId },
  });
  return response.data;
};
