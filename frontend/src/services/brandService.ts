import {axiosClient} from "../lib/axiosClient";
import {Brand} from "../types/brand";

export interface BrandCreateRequest {
    brandName: string;
    logoUrl: string;
    description?: string;
}

export interface BrandUpdateRequest {
    brandName: string;
    logoUrl: string;
    description?: string;
    isActive?: boolean;
}

export const getBrands = async (): Promise<Brand[]> => {
    const response = await axiosClient.get<Brand[]>("/brands");
    return response.data;
};

export const getBrandById = async (id: number): Promise<Brand> => {
    const response = await axiosClient.get<Brand>(`/brands/${id}`);
    return response.data;
};

export const createBrand = async (
    payload: BrandCreateRequest
): Promise<Brand> => {
    const response = await axiosClient.post<Brand>("/brands", payload);
    return response.data;
};

export const updateBrand = async (
    id: number,
    payload: BrandUpdateRequest
): Promise<Brand> => {
    const response = await axiosClient.put<Brand>(`/brands/${id}`, payload);
    return response.data;
};

