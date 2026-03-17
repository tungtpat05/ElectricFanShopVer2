import { axiosClient } from "../lib/axiosClient";
import { Category } from "../types/category";

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get<Category[]>("/categories");
  return response.data;
}   