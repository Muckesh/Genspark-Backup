import { PropertyListing, PropertyImage, PagedResult } from '../../models/user.model';

export interface PropertyState {
  listings: PagedResult<PropertyListing> | null;
  currentListing: PropertyListing | null;
  images: PropertyImage[];
  isLoading: boolean;
  error: string | null;
}

export const initialPropertyState: PropertyState = {
  listings: null,
  currentListing: null,
  images: [],
  isLoading: false,
  error: null
};