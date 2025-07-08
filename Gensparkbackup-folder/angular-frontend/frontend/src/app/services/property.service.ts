import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { PropertyListing, PagedResult, PropertyQueryParams, PropertyImage } from '../models/property.model';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {
  private apiUrl = `${environment.apiUrl}/propertylistings`;

  constructor(private http: HttpClient) {}

  getProperties(queryParams: PropertyQueryParams): Observable<PagedResult<PropertyListing>> {
    let params = new HttpParams()
      .set('pageNumber', queryParams.pageNumber.toString())
      .set('pageSize', queryParams.pageSize.toString());

    if (queryParams.keyword) params = params.set('keyword', queryParams.keyword);
    if (queryParams.location) params = params.set('location', queryParams.location);
    if (queryParams.minPrice) params = params.set('minPrice', queryParams.minPrice.toString());
    if (queryParams.maxPrice) params = params.set('maxPrice', queryParams.maxPrice.toString());
    if (queryParams.minBedrooms) params = params.set('minBedrooms', queryParams.minBedrooms.toString());
    if (queryParams.minBathrooms) params = params.set('minBathrooms', queryParams.minBathrooms.toString());
    if (queryParams.sortBy) params = params.set('sortBy', queryParams.sortBy);
    if (queryParams.isDescending) params = params.set('isDescending', queryParams.isDescending.toString());

    return this.http.get<PagedResult<PropertyListing>>(this.apiUrl, { params });
  }

  getPropertyById(id: string): Observable<PropertyListing> {
    return this.http.get<PropertyListing>(`${this.apiUrl}/${id}`);
  }

  createProperty(propertyData: any): Observable<PropertyListing> {
    return this.http.post<PropertyListing>(this.apiUrl, propertyData);
  }

  updateProperty(id: string, propertyData: any): Observable<PropertyListing> {
    return this.http.put<PropertyListing>(`${this.apiUrl}/${id}`, propertyData);
  }

  deleteProperty(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Add to property.service.ts
    uploadPropertyImage(propertyId: string, file: File): Observable<PropertyImage> {
    const formData = new FormData();
    formData.append('imageFile', file);
    return this.http.post<PropertyImage>(`${this.apiUrl}/images/upload`, formData, {
        params: { propertyListingId: propertyId }
    });
    }

    // Add to property.service.ts
    addToFavorites(propertyId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/favorites`, { propertyId });
    }

    removeFromFavorites(propertyId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/favorites/${propertyId}`);
    }

    getFavorites(): Observable<PropertyListing[]> {
    return this.http.get<PropertyListing[]>(`${this.apiUrl}/favorites`);
    }
}