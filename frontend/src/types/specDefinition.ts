export type SpecDataType = 'text' | 'number' | 'select';

export interface SpecDefinitionOption {
  id: number;
  optionValue: string;
  displayOrder: number;
}

export interface SpecDefinitionOptionCreateRequest {
  optionValue: string;
  displayOrder?: number;
}

export interface SpecDefinition {
  id: number;
  categoryId: number;
  keyCode: string;
  displayName: string;
  dataType: SpecDataType;
  unit?: string;
  displayOrder: number;
  isRequired: boolean;
  isActive: boolean;
  options?: SpecDefinitionOption[];
}

export interface SpecDefinitionCreateRequest {
  keyCode: string;
  displayName: string;
  dataType: SpecDataType;
  unit?: string;
  displayOrder?: number;
  isRequired?: boolean;
}

export interface SpecDefinitionUpdateRequest {
  keyCode: string;
  displayName: string;
  dataType: SpecDataType;
  unit?: string;
  displayOrder?: number;
  isRequired?: boolean;
  isActive?: boolean;
}

export interface ProductSpecification {
  id: number;
  productId: number;
  specDefinitionId: number;
  displayName: string;
  keyCode: string;
  dataType: SpecDataType;
  unit?: string;
  value?: string;
  valueNumber?: number;
  optionId?: number;
  optionValue?: string;
}

export interface ProductSpecificationCreateRequest {
  specDefinitionId: number;
  value?: string;
  valueNumber?: number;
  optionId?: number;
}

export interface ProductSpecificationUpdateRequest {
  specDefinitionId: number;
  value?: string;
  valueNumber?: number;
  optionId?: number;
}
