import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { 
  User, 
  Agent, 
  Buyer, 
  PropertyListing, 
  PropertyImage, 
  Inquiry, 
  PagedResult,
  AuthResponse,
  LoginRequest,
  RefreshTokenRequest,
  LogoutRequest,
  RegisterAgentRequest,
  RegisterBuyerRequest,
  UpdateAgentRequest,
  UpdateBuyerRequest,
  CreatePropertyListingRequest,
  UpdatePropertyListingRequest,
  AddInquiryRequest,
  AddPropertyImageRequest,
  PropertyListingQuery,
  AgentQuery,
  BuyerQuery,
  InquiryQuery,
  UserQuery,
  ChangePasswordRequest,
  CreateUserRequest,
  UpdateUserRequest
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = 'https://localhost:7001/api/v1.0'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  // Auth endpoints
  login(request: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/login`, request);
  }

  refreshToken(request: RefreshTokenRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/auth/refresh`, request);
  }

  logout(request: LogoutRequest): Observable<any> {
    return this.http.post(`${this.baseUrl}/auth/logout`, request);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.baseUrl}/auth/me`);
  }

  // Agent endpoints
  getFilteredAgents(query: AgentQuery): Observable<PagedResult<Agent>> {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      const value = (query as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<PagedResult<Agent>>(`${this.baseUrl}/agents`, { params });
  }

  registerAgent(request: RegisterAgentRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/agents/register`, request);
  }

  updateAgent(id: string, request: UpdateAgentRequest): Observable<Agent> {
    return this.http.put<Agent>(`${this.baseUrl}/agents/${id}`, request);
  }

  // Buyer endpoints
  getFilteredBuyers(query: BuyerQuery): Observable<PagedResult<Buyer>> {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      const value = (query as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<PagedResult<Buyer>>(`${this.baseUrl}/buyers`, { params });
  }

  registerBuyer(request: RegisterBuyerRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.baseUrl}/buyers/register`, request);
  }

  updateBuyer(id: string, request: UpdateBuyerRequest): Observable<Buyer> {
    return this.http.put<Buyer>(`${this.baseUrl}/buyers/${id}`, request);
  }

  // Property Listing endpoints
  getFilteredListings(query: PropertyListingQuery): Observable<PagedResult<PropertyListing>> {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      const value = (query as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<PagedResult<PropertyListing>>(`${this.baseUrl}/propertylistings`, { params });
  }

  getListingById(id: string): Observable<PropertyListing> {
    return this.http.get<PropertyListing>(`${this.baseUrl}/propertylistings/${id}`);
  }

  createListing(request: CreatePropertyListingRequest): Observable<PropertyListing> {
    return this.http.post<PropertyListing>(`${this.baseUrl}/propertylistings`, request);
  }

  updateListing(id: string, request: UpdatePropertyListingRequest): Observable<PropertyListing> {
    return this.http.put<PropertyListing>(`${this.baseUrl}/propertylistings/${id}`, request);
  }

  deleteListing(id: string): Observable<PropertyListing> {
    return this.http.delete<PropertyListing>(`${this.baseUrl}/propertylistings/${id}`);
  }

  // Property Image endpoints
  uploadPropertyImage(request: AddPropertyImageRequest): Observable<PropertyImage> {
    const formData = new FormData();
    formData.append('propertyListingId', request.propertyListingId);
    formData.append('imageFile', request.imageFile);
    return this.http.post<PropertyImage>(`${this.baseUrl}/propertylistings/images/upload`, formData);
  }

  getImageFile(imageId: string): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/propertyimages/file/${imageId}`, { responseType: 'blob' });
  }

  getListingImageUrls(listingId: string): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/propertyimages/urls/${listingId}`);
  }

  deletePropertyImage(imageId: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/propertyimages/${imageId}`);
  }

  // Inquiry endpoints
  getFilteredInquiries(query: InquiryQuery): Observable<PagedResult<Inquiry>> {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      const value = (query as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<PagedResult<Inquiry>>(`${this.baseUrl}/inquiries`, { params });
  }

  createInquiry(request: AddInquiryRequest): Observable<Inquiry> {
    return this.http.post<Inquiry>(`${this.baseUrl}/inquiries`, request);
  }

  // User endpoints
  getFilteredUsers(query: UserQuery): Observable<PagedResult<User>> {
    let params = new HttpParams();
    Object.keys(query).forEach(key => {
      const value = (query as any)[key];
      if (value !== undefined && value !== null && value !== '') {
        params = params.set(key, value.toString());
      }
    });
    return this.http.get<PagedResult<User>>(`${this.baseUrl}/user`, { params });
  }

  updateUser(id: string, request: UpdateUserRequest): Observable<User> {
    return this.http.put<User>(`${this.baseUrl}/user/${id}`, request);
  }

  changePassword(id: string, request: ChangePasswordRequest): Observable<any> {
    return this.http.put(`${this.baseUrl}/user/change-password/${id}`, request);
  }

  deleteUser(id: string): Observable<any> {
    return this.http.delete(`${this.baseUrl}/user/${id}`);
  }

  // Helper method to build query parameters
  private buildQueryParams(params: any): HttpParams {
    let httpParams = new HttpParams();
    Object.keys(params).forEach(key => {
      const value = params[key];
      if (value !== undefined && value !== null && value !== '') {
        httpParams = httpParams.set(key, value.toString());
      }
    });
    return httpParams;
  }
}