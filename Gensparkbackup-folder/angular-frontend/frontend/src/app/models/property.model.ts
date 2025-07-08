import { Agent } from './agent.model';

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
  createdAt: Date;
  isDeleted: boolean;
}

export interface PropertyImage {
  id: string;
  fileName: string;
  fileUrl: string;
  isDeleted: boolean;
  deletedAt?: Date;
  propertyListingId: string;
}

export interface PropertyQueryParams {
  keyword?: string;
  location?: string;
  minPrice?: number;
  maxPrice?: number;
  minBedrooms?: number;
  minBathrooms?: number;
  sortBy?: string;
  isDescending?: boolean;
  pageNumber: number;
  pageSize: number;
}

export interface PagedResult<T> {
  pageNumber: number;
  pageSize: number;
  totalCount: number;
  items: T[];
}