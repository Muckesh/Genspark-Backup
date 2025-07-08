import { createAction, props } from '@ngrx/store';
import { 
  PropertyListing, 
  PropertyImage, 
  PagedResult, 
  PropertyListingQuery,
  CreatePropertyListingRequest,
  UpdatePropertyListingRequest,
  AddPropertyImageRequest
} from '../../models/user.model';

// Load Listings
export const loadListings = createAction(
  '[Property] Load Listings',
  props<{ query: PropertyListingQuery }>()
);

export const loadListingsSuccess = createAction(
  '[Property] Load Listings Success',
  props<{ listings: PagedResult<PropertyListing> }>()
);

export const loadListingsFailure = createAction(
  '[Property] Load Listings Failure',
  props<{ error: string }>()
);

// Load Single Listing
export const loadListing = createAction(
  '[Property] Load Listing',
  props<{ id: string }>()
);

export const loadListingSuccess = createAction(
  '[Property] Load Listing Success',
  props<{ listing: PropertyListing }>()
);

export const loadListingFailure = createAction(
  '[Property] Load Listing Failure',
  props<{ error: string }>()
);

// Create Listing
export const createListing = createAction(
  '[Property] Create Listing',
  props<{ request: CreatePropertyListingRequest }>()
);

export const createListingSuccess = createAction(
  '[Property] Create Listing Success',
  props<{ listing: PropertyListing }>()
);

export const createListingFailure = createAction(
  '[Property] Create Listing Failure',
  props<{ error: string }>()
);

// Update Listing
export const updateListing = createAction(
  '[Property] Update Listing',
  props<{ id: string; request: UpdatePropertyListingRequest }>()
);

export const updateListingSuccess = createAction(
  '[Property] Update Listing Success',
  props<{ listing: PropertyListing }>()
);

export const updateListingFailure = createAction(
  '[Property] Update Listing Failure',
  props<{ error: string }>()
);

// Delete Listing
export const deleteListing = createAction(
  '[Property] Delete Listing',
  props<{ id: string }>()
);

export const deleteListingSuccess = createAction(
  '[Property] Delete Listing Success',
  props<{ listing: PropertyListing }>()
);

export const deleteListingFailure = createAction(
  '[Property] Delete Listing Failure',
  props<{ error: string }>()
);

// Upload Image
export const uploadImage = createAction(
  '[Property] Upload Image',
  props<{ request: AddPropertyImageRequest }>()
);

export const uploadImageSuccess = createAction(
  '[Property] Upload Image Success',
  props<{ image: PropertyImage }>()
);

export const uploadImageFailure = createAction(
  '[Property] Upload Image Failure',
  props<{ error: string }>()
);

// Load Images
export const loadImages = createAction(
  '[Property] Load Images',
  props<{ listingId: string }>()
);

export const loadImagesSuccess = createAction(
  '[Property] Load Images Success',
  props<{ images: string[] }>()
);

export const loadImagesFailure = createAction(
  '[Property] Load Images Failure',
  props<{ error: string }>()
);

// Delete Image
export const deleteImage = createAction(
  '[Property] Delete Image',
  props<{ imageId: string }>()
);

export const deleteImageSuccess = createAction(
  '[Property] Delete Image Success',
  props<{ imageId: string }>()
);

export const deleteImageFailure = createAction(
  '[Property] Delete Image Failure',
  props<{ error: string }>()
);

// Clear State
export const clearPropertyState = createAction('[Property] Clear State');

export const clearError = createAction('[Property] Clear Error');