import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PropertyState } from './property.state';

export const selectPropertyState = createFeatureSelector<PropertyState>('property');

export const selectListings = createSelector(
  selectPropertyState,
  (state: PropertyState) => state.listings
);

export const selectCurrentListing = createSelector(
  selectPropertyState,
  (state: PropertyState) => state.currentListing
);

export const selectPropertyImages = createSelector(
  selectPropertyState,
  (state: PropertyState) => state.images
);

export const selectPropertyLoading = createSelector(
  selectPropertyState,
  (state: PropertyState) => state.isLoading
);

export const selectPropertyError = createSelector(
  selectPropertyState,
  (state: PropertyState) => state.error
);

export const selectListingItems = createSelector(
  selectListings,
  (listings) => listings?.items || []
);

export const selectListingsPagination = createSelector(
  selectListings,
  (listings) => listings ? {
    pageNumber: listings.pageNumber,
    pageSize: listings.pageSize,
    totalCount: listings.totalCount,
    totalPages: Math.ceil(listings.totalCount / listings.pageSize)
  } : null
);