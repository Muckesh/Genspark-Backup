export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: Date;
  isDeleted: boolean;
}

export interface AuthResponse {
  email: string;
  role: string;
  token: string;
  refreshToken: string;
}

export interface LoginDto {
  email: string;
  password: string;
}