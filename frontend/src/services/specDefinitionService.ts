import { axiosClient } from "../lib/axiosClient";
import {
  SpecDefinition,
  SpecDefinitionCreateRequest,
  SpecDefinitionUpdateRequest,
  SpecDefinitionOption,
  SpecDefinitionOptionCreateRequest,
} from "../types/specDefinition";

export const getSpecDefinitionsByCategory = async (
  categoryId: number,
  activeOnly: boolean = false
): Promise<SpecDefinition[]> => {
  const response = await axiosClient.get<SpecDefinition[]>(
    `/categories/${categoryId}/spec-definitions`,
    { params: { activeOnly } }
  );
  return response.data;
};

export const getSpecDefinitionById = async (
  categoryId: number,
  id: number
): Promise<SpecDefinition> => {
  const response = await axiosClient.get<SpecDefinition>(
    `/categories/${categoryId}/spec-definitions/${id}`
  );
  return response.data;
};

export const createSpecDefinition = async (
  categoryId: number,
  payload: SpecDefinitionCreateRequest
): Promise<SpecDefinition> => {
  const response = await axiosClient.post<SpecDefinition>(
    `/categories/${categoryId}/spec-definitions`,
    payload
  );
  return response.data;
};

export const updateSpecDefinition = async (
  categoryId: number,
  id: number,
  payload: SpecDefinitionUpdateRequest
): Promise<SpecDefinition> => {
  const response = await axiosClient.put<SpecDefinition>(
    `/categories/${categoryId}/spec-definitions/${id}`,
    payload
  );
  return response.data;
};

export const deleteSpecDefinition = async (
  categoryId: number,
  id: number
): Promise<void> => {
  await axiosClient.delete(`/categories/${categoryId}/spec-definitions/${id}`);
};

// Spec Option APIs
export const getSpecDefinitionOptions = async (
  categoryId: number,
  specDefId: number
): Promise<SpecDefinitionOption[]> => {
  const response = await axiosClient.get<SpecDefinitionOption[]>(
    `/categories/${categoryId}/spec-definitions/${specDefId}/options`
  );
  return response.data;
};

export const createSpecDefinitionOption = async (
  categoryId: number,
  specDefId: number,
  payload: SpecDefinitionOptionCreateRequest
): Promise<SpecDefinitionOption> => {
  const response = await axiosClient.post<SpecDefinitionOption>(
    `/categories/${categoryId}/spec-definitions/${specDefId}/options`,
    payload
  );
  return response.data;
};

export const updateSpecDefinitionOption = async (
  categoryId: number,
  specDefId: number,
  optionId: number,
  payload: SpecDefinitionOptionCreateRequest
): Promise<SpecDefinitionOption> => {
  const response = await axiosClient.put<SpecDefinitionOption>(
    `/categories/${categoryId}/spec-definitions/${specDefId}/options/${optionId}`,
    payload
  );
  return response.data;
};

export const deleteSpecDefinitionOption = async (
  categoryId: number,
  specDefId: number,
  optionId: number
): Promise<void> => {
  await axiosClient.delete(
    `/categories/${categoryId}/spec-definitions/${specDefId}/options/${optionId}`
  );
};
