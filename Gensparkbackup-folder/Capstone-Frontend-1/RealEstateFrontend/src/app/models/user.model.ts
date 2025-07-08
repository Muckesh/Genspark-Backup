export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  createdAt: string;
  isDeleted: boolean;
  refreshToken?: string;
  refreshTokenExpiryTime?: string;
  agentProfile?: Agent;
  buyerProfile?: Buyer;
}

export interface Agent {
  id: string;
  licenseNumber: string;
  agencyName: string;
  phone: string;
  user?: User;
  listings?: PropertyListing[];
}

export interface Buyer {
  id: string;
  preferredLocation: string;
  budget: number;
  user?: User;
  inquiries?: Inquiry[];
}

export interface PropertyListing {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  agentId: string;
  agent?: Agent;
  createdAt: string;
  isDeleted: boolean;
  images?: PropertyImage[];
  inquiries?: Inquiry[];
}

export interface PropertyImage {
  id: string;
  fileName: string;
  fileUrl: string;
  isDeleted: boolean;
  deletedAt?: string;
  propertyListingId: string;
  listing?: PropertyListing;
}

export interface Inquiry {
  id: string;
  listingId: string;
  listing?: PropertyListing;
  buyerId: string;
  buyer?: Buyer;
  message: string;
  createdAt: string;
}

export interface PagedResult<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}

export interface AuthResponse {
  email: string;
  role: string;
  token: string;
  refreshToken: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RefreshTokenRequest {
  refreshToken: string;
}

export interface LogoutRequest {
  refreshToken: string;
}

export interface RegisterAgentRequest {
  name: string;
  email: string;
  password: string;
  licenseNumber: string;
  agencyName: string;
  phone: string;
}

export interface RegisterBuyerRequest {
  name: string;
  email: string;
  password: string;
  preferredLocation: string;
  budget: number;
}

export interface UpdateAgentRequest {
  licenseNumber?: string;
  agencyName?: string;
  phone?: string;
}

export interface UpdateBuyerRequest {
  preferredLocation?: string;
  budget?: number;
}

export interface CreatePropertyListingRequest {
  title: string;
  description: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  squareFeet: number;
  agentId?: string;
}

export interface UpdatePropertyListingRequest {
  title?: string;
  description?: string;
  price?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  squareFeet?: number;
}

export interface AddInquiryRequest {
  listingId: string;
  buyerId?: string;
  message: string;
}

export interface AddPropertyImageRequest {
  propertyListingId: string;
  imageFile: File;
}

export interface PropertyListingQuery {
  keyword?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface AgentQuery {
  name?: string;
  agencyName?: string;
  phone?: string;
  email?: string;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface BuyerQuery {
  preferredLocation?: string;
  minBudget?: number;
  maxBudget?: number;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface InquiryQuery {
  listingId?: string;
  buyerId?: string;
  fromDate?: string;
  toDate?: string;
  keyword?: string;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface UserQuery {
  name?: string;
  email?: string;
  role?: string;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber?: number;
  pageSize?: number;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}

export interface CreateUserRequest {
  name: string;
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  name?: string;
  email?: string;
  role?: string;
}