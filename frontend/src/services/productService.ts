import { axiosClient } from "../lib/axiosClient";
import { Product } from "../types/product";

export interface ProductCreateRequest {
  productName: string;
  slug: string;
  brandId: number;
  categoryId: number;
  summary: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  thumbnail: string;
  thumbnailPublicId: string;
  engineCapacity?: number;
  weightGram?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  isFeatured?: boolean;
}

export interface ProductUpdateRequest {
  productName: string;
  slug: string;
  brandId: number;
  categoryId: number;
  summary: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  thumbnail: string;
  thumbnailPublicId: string;
  engineCapacity?: number;
  weightGram?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  isFeatured?: boolean;
  isActive?: boolean;
}

export interface ImageUploadResponse {
  url: string;
  publicId: string;
}

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

export const createProduct = async (payload: ProductCreateRequest): Promise<Product> => {
  const response = await axiosClient.post<Product>("/products", payload);
  return response.data;
};

export const updateProduct = async (id: number, payload: ProductUpdateRequest): Promise<Product> => {
  const response = await axiosClient.put<Product>(`/products/${id}`, payload);
  return response.data;
};

export const uploadProductImage = async (file: File): Promise<ImageUploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);
  const response = await axiosClient.post<ImageUploadResponse>("/images/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};
