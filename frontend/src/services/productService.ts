import { axiosClient } from "../lib/axiosClient";
import { Product, ProductImage, ProductVariant, ProductVariantCreateRequest, ProductVariantUpdateRequest } from "../types/product";

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

export const getProductImages = async (productId: number): Promise<ProductImage[]> => {
  const response = await axiosClient.get<ProductImage[]>(`/products/${productId}/images`);
  return response.data;
};

export const addProductImage = async (productId: number, imageUrl: string, imagePublicId?: string): Promise<ProductImage> => {
  const response = await axiosClient.post<ProductImage>(`/products/${productId}/images`, { imageUrl, imagePublicId });
  return response.data;
};

export const updateProductImage = async (
  productId: number,
  imageId: number,
  payload: { imageUrl?: string; imagePublicId?: string; displayOrder?: number }
): Promise<ProductImage> => {
  const response = await axiosClient.put<ProductImage>(`/products/${productId}/images/${imageId}`, payload);
  return response.data;
};

export const deleteProductImage = async (productId: number, imageId: number): Promise<void> => {
  await axiosClient.delete(`/products/${productId}/images/${imageId}`);
};

export const reorderProductImages = async (productId: number, imageIds: number[]): Promise<ProductImage[]> => {
  const response = await axiosClient.put<ProductImage[]>(`/products/${productId}/images/reorder`, imageIds);
  return response.data;
};

export const getProductVariants = async (productId: number): Promise<ProductVariant[]> => {
  const response = await axiosClient.get<ProductVariant[]>(`/products/${productId}/variants`);
  return response.data;
};

export const createProductVariant = async (
  productId: number,
  payload: ProductVariantCreateRequest
): Promise<ProductVariant> => {
  const response = await axiosClient.post<ProductVariant>(`/products/${productId}/variants`, payload);
  return response.data;
};

export const updateProductVariant = async (
  productId: number,
  variantId: number,
  payload: ProductVariantUpdateRequest
): Promise<ProductVariant> => {
  const response = await axiosClient.put<ProductVariant>(`/products/${productId}/variants/${variantId}`, payload);
  return response.data;
};


