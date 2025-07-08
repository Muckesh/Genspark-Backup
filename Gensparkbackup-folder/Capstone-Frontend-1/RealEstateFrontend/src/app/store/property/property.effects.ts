import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ApiService } from '../../services/api.service';
import * as PropertyActions from './property.actions';

@Injectable()
export class PropertyEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService
  ) {}

  loadListings$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.loadListings),
      switchMap(({ query }) =>
        this.apiService.getFilteredListings(query).pipe(
          map((listings) => PropertyActions.loadListingsSuccess({ listings })),
          catchError((error) =>
            of(PropertyActions.loadListingsFailure({ error: error.message || 'Failed to load listings' }))
          )
        )
      )
    )
  );

  loadListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.loadListing),
      switchMap(({ id }) =>
        this.apiService.getListingById(id).pipe(
          map((listing) => PropertyActions.loadListingSuccess({ listing })),
          catchError((error) =>
            of(PropertyActions.loadListingFailure({ error: error.message || 'Failed to load listing' }))
          )
        )
      )
    )
  );

  createListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.createListing),
      switchMap(({ request }) =>
        this.apiService.createListing(request).pipe(
          map((listing) => PropertyActions.createListingSuccess({ listing })),
          catchError((error) =>
            of(PropertyActions.createListingFailure({ error: error.message || 'Failed to create listing' }))
          )
        )
      )
    )
  );

  updateListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.updateListing),
      switchMap(({ id, request }) =>
        this.apiService.updateListing(id, request).pipe(
          map((listing) => PropertyActions.updateListingSuccess({ listing })),
          catchError((error) =>
            of(PropertyActions.updateListingFailure({ error: error.message || 'Failed to update listing' }))
          )
        )
      )
    )
  );

  deleteListing$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.deleteListing),
      switchMap(({ id }) =>
        this.apiService.deleteListing(id).pipe(
          map((listing) => PropertyActions.deleteListingSuccess({ listing })),
          catchError((error) =>
            of(PropertyActions.deleteListingFailure({ error: error.message || 'Failed to delete listing' }))
          )
        )
      )
    )
  );

  uploadImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.uploadImage),
      switchMap(({ request }) =>
        this.apiService.uploadPropertyImage(request).pipe(
          map((image) => PropertyActions.uploadImageSuccess({ image })),
          catchError((error) =>
            of(PropertyActions.uploadImageFailure({ error: error.message || 'Failed to upload image' }))
          )
        )
      )
    )
  );

  loadImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.loadImages),
      switchMap(({ listingId }) =>
        this.apiService.getListingImageUrls(listingId).pipe(
          map((images) => PropertyActions.loadImagesSuccess({ images })),
          catchError((error) =>
            of(PropertyActions.loadImagesFailure({ error: error.message || 'Failed to load images' }))
          )
        )
      )
    )
  );

  deleteImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PropertyActions.deleteImage),
      switchMap(({ imageId }) =>
        this.apiService.deletePropertyImage(imageId).pipe(
          map(() => PropertyActions.deleteImageSuccess({ imageId })),
          catchError((error) =>
            of(PropertyActions.deleteImageFailure({ error: error.message || 'Failed to delete image' }))
          )
        )
      )
    )
  );
}