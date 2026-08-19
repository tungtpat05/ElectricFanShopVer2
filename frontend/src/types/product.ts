import { Brand } from './brand';
import { Category } from './category';
import { Color } from './color';
import { ProductSpecification } from './specDefinition';

export interface ProductImage {
  id: number;
  imageUrl: string;
  imagePublicId?: string;
  displayOrder: number;
}

export interface ProductVariant {
  id: number;
  productId: number;
  color: Color;
  sku: string;
  additionalPrice: number;
  stockQuantity: number;
  variantImage: string;
  variantImagePublicId?: string;
  isActive: boolean;
}

export interface ProductVariantCreateRequest {
  colorId: number;
  sku: string;
  additionalPrice: number;
  stockQuantity: number;
  variantImage: string;
  variantImagePublicId?: string;
}

export interface ProductVariantUpdateRequest {
  colorId?: number;
  sku?: string;
  additionalPrice?: number;
  stockQuantity?: number;
  variantImage?: string;
  variantImagePublicId?: string;
  isActive?: boolean;
}

export interface Product {
  id: number;
  productName: string;
  slug: string;
  brand: Brand;
  category: Category;
  summary: string;
  description: string;
  basePrice: number;
  discountPrice: number;
  thumbnail: string;
  thumbnailPublicId: string;
  weightGram?: number;
  lengthCm?: number;
  widthCm?: number;
  heightCm?: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  images?: ProductImage[];
  variants?: ProductVariant[];
  specifications?: ProductSpecification[];
}