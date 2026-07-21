import { Brand } from './brand';
import { Category } from './category';

export interface ProductImage {
  id: number;
  imageUrl: string;
  imagePublicId?: string;
  displayOrder: number;
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
  engineCapacity: number;
  weightGram: number;
  lengthCm: number;
  widthCm: number;
  heightCm: number;
  isFeatured: boolean;
  isActive: boolean;
  createdAt: string;
  images?: ProductImage[];
}