import { axiosClient } from "../lib/axiosClient";
import { Category } from "../types/category";

export interface CategoryCreateRequest {
  categoryName: string;
  slug: string;
  categoryImage: string;
  description?: string;
}

export interface CategoryUpdateRequest {
  categoryName: string;
  slug: string;
  categoryImage: string;
  description?: string;
  isActive?: boolean;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await axiosClient.get<Category[]>("/categories");
  return response.data;
};

export const getCategoryById = async (id: number): Promise<Category> => {
  const response = await axiosClient.get<Category>(`/categories/${id}`);
  return response.data;
};

export const createCategory = async (
  payload: CategoryCreateRequest
): Promise<Category> => {
  const response = await axiosClient.post<Category>("/categories", payload);
  return response.data;
};

export const updateCategory = async (
  id: number,
  payload: CategoryUpdateRequest
): Promise<Category> => {
  const response = await axiosClient.put<Category>(`/categories/${id}`, payload);
  return response.data;
};

export interface ImageUploadResponse {
  url: string;
  publicId: string;
}

export const uploadCategoryImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosClient.post<ImageUploadResponse>("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

