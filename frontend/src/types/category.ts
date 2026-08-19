import { SpecDefinition } from './specDefinition';

export interface Category {
  id: number;
  categoryName: string;
  slug: string;
  categoryImage: string;
  description: string;
  isActive: boolean;
  specDefinitions?: SpecDefinition[];
}