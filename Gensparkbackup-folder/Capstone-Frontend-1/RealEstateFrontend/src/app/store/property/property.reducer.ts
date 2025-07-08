import { createReducer, on } from '@ngrx/store';
import { PropertyState, initialPropertyState } from './property.state';
import * as PropertyActions from './property.actions';

export const propertyReducer = createReducer(
  initialPropertyState,
  
  // Load Listings
  on(PropertyActions.loadListings, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(PropertyActions.loadListingsSuccess, (state, { listings }) => ({
    ...state,
    listings,
    isLoading: false,
    error: null
  })),
  
  on(PropertyActions.loadListingsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Load Single Listing
  on(PropertyActions.loadListing, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(PropertyActions.loadListingSuccess, (state, { listing }) => ({
    ...state,
    currentListing: listing,
    isLoading: false,
    error: null
  })),
  
  on(PropertyActions.loadListingFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Create Listing
  on(PropertyActions.createListing, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(PropertyActions.createListingSuccess, (state, { listing }) => ({
    ...state,
    currentListing: listing,
    isLoading: false,
    error: null
  })),
  
  on(PropertyActions.createListingFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Update Listing
  on(PropertyActions.updateListing, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(PropertyActions.updateListingSuccess, (state, { listing }) => ({
    ...state,
    currentListing: listing,
    isLoading: false,
    error: null
  })),
  
  on(PropertyActions.updateListingFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Delete Listing
  on(PropertyActions.deleteListing, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(PropertyActions.deleteListingSuccess, (state) => ({
    ...state,
    currentListing: null,
    isLoading: false,
    error: null
  })),
  
  on(PropertyActions.deleteListingFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Upload Image
  on(PropertyActions.uploadImage, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(PropertyActions.uploadImageSuccess, (state, { image }) => ({
    ...state,
    images: [...state.images, image],
    isLoading: false,
    error: null
  })),
  
  on(PropertyActions.uploadImageFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Delete Image
  on(PropertyActions.deleteImage, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(PropertyActions.deleteImageSuccess, (state, { imageId }) => ({
    ...state,
    images: state.images.filter(img => img.id !== imageId),
    isLoading: false,
    error: null
  })),
  
  on(PropertyActions.deleteImageFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Clear State
  on(PropertyActions.clearPropertyState, () => initialPropertyState),
  
  on(PropertyActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);