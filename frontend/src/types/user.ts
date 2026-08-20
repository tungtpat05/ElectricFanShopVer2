export interface User {
  id: number;
  email: string;
  fullName: string;
  role: string;
  isActive?: boolean;
  createdAt?: string;
}