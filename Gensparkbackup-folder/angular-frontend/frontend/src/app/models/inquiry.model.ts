import { PropertyListing } from './property.model';
import { Buyer } from './buyer.model';

export interface Inquiry {
  id: string;
  listingId: string;
  listing?: PropertyListing;
  buyerId: string;
  buyer?: Buyer;
  message: string;
  createdAt: Date;
}

export interface AddInquiryDto {
  listingId: string;
  buyerId?: string;
  message: string;
}