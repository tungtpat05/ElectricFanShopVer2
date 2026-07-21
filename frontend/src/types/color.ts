export interface Color {
  id: number;
  colorName: string;
  colorCode?: string;
}

export interface ColorCreateRequest {
  colorName: string;
  colorCode?: string;
}

export interface ColorUpdateRequest {
  colorName?: string;
  colorCode?: string;
}
