import { axiosClient } from "../lib/axiosClient";
import { Color, ColorCreateRequest } from "../types/color";

export const getColors = async (): Promise<Color[]> => {
  const response = await axiosClient.get<Color[]>("/colors");
  return response.data;
};

export const createColor = async (payload: ColorCreateRequest): Promise<Color> => {
  const response = await axiosClient.post<Color>("/colors", payload);
  return response.data;
};
