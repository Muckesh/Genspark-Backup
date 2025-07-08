import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError, timer } from 'rxjs';
import { catchError, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from './api.service';
import { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RefreshTokenRequest, 
  LogoutRequest,
  RegisterAgentRequest,
  RegisterBuyerRequest 
} from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private refreshTokenSubject = new BehaviorSubject<string | null>(null);
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  private isLoadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string | null>(null);

  public currentUser$ = this.currentUserSubject.asObservable();
  public token$ = this.tokenSubject.asObservable();
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();
  public isLoading$ = this.isLoadingSubject.asObservable();
  public error$ = this.errorSubject.asObservable();

  private refreshTimer: any;

  constructor(
    private apiService: ApiService,
    private router: Router
  ) {
    this.initializeAuth();
  }

  private initializeAuth(): void {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const userData = localStorage.getItem('current_user');

    if (token && refreshToken && userData) {
      try {
        const user = JSON.parse(userData);
        this.tokenSubject.next(token);
        this.refreshTokenSubject.next(refreshToken);
        this.currentUserSubject.next(user);
        this.isAuthenticatedSubject.next(true);
        this.scheduleTokenRefresh();
      } catch (error) {
        console.error('Error parsing stored user data:', error);
        this.logout();
      }
    }
  }

  login(loginRequest: LoginRequest): Observable<AuthResponse> {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    return this.apiService.login(loginRequest).pipe(
      tap(response => {
        this.setAuthData(response);
        this.scheduleTokenRefresh();
      }),
      switchMap(() => this.loadCurrentUser()),
      tap(() => {
        this.isLoadingSubject.next(false);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        this.isLoadingSubject.next(false);
        this.errorSubject.next(error.message || 'Login failed');
        return throwError(() => error);
      })
    );
  }

  registerAgent(request: RegisterAgentRequest): Observable<AuthResponse> {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    return this.apiService.registerAgent(request).pipe(
      tap(response => {
        this.setAuthData(response);
        this.scheduleTokenRefresh();
      }),
      switchMap(() => this.loadCurrentUser()),
      tap(() => {
        this.isLoadingSubject.next(false);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        this.isLoadingSubject.next(false);
        this.errorSubject.next(error.message || 'Registration failed');
        return throwError(() => error);
      })
    );
  }

  registerBuyer(request: RegisterBuyerRequest): Observable<AuthResponse> {
    this.isLoadingSubject.next(true);
    this.errorSubject.next(null);

    return this.apiService.registerBuyer(request).pipe(
      tap(response => {
        this.setAuthData(response);
        this.scheduleTokenRefresh();
      }),
      switchMap(() => this.loadCurrentUser()),
      tap(() => {
        this.isLoadingSubject.next(false);
        this.router.navigate(['/dashboard']);
      }),
      catchError(error => {
        this.isLoadingSubject.next(false);
        this.errorSubject.next(error.message || 'Registration failed');
        return throwError(() => error);
      })
    );
  }

  refreshToken(): Observable<AuthResponse> {
    const refreshToken = this.refreshTokenSubject.value;
    if (!refreshToken) {
      this.logout();
      return throwError(() => new Error('No refresh token available'));
    }

    const request: RefreshTokenRequest = { refreshToken };
    return this.apiService.refreshToken(request).pipe(
      tap(response => {
        this.setAuthData(response);
        this.scheduleTokenRefresh();
      }),
      catchError(error => {
        console.error('Token refresh error:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  logout(): void {
    const refreshToken = this.refreshTokenSubject.value;
    
    if (refreshToken) {
      const logoutRequest: LogoutRequest = { refreshToken };
      this.apiService.logout(logoutRequest).subscribe({
        next: () => console.log('Logout successful'),
        error: (error) => console.error('Logout error:', error)
      });
    }

    this.clearAuthData();
    this.clearRefreshTimer();
    this.router.navigate(['/login']);
  }

  getCurrentUser(): Observable<User> {
    return this.apiService.getCurrentUser().pipe(
      tap(user => {
        this.currentUserSubject.next(user);
        localStorage.setItem('current_user', JSON.stringify(user));
      }),
      catchError(error => {
        console.error('Error loading current user:', error);
        this.logout();
        return throwError(() => error);
      })
    );
  }

  private loadCurrentUser(): Observable<User> {
    return this.getCurrentUser();
  }

  private setAuthData(response: AuthResponse): void {
    localStorage.setItem('access_token', response.token);
    localStorage.setItem('refresh_token', response.refreshToken);
    
    this.tokenSubject.next(response.token);
    this.refreshTokenSubject.next(response.refreshToken);
    this.isAuthenticatedSubject.next(true);
  }

  private clearAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('current_user');
    
    this.tokenSubject.next(null);
    this.refreshTokenSubject.next(null);
    this.currentUserSubject.next(null);
    this.isAuthenticatedSubject.next(false);
    this.errorSubject.next(null);
  }

  private scheduleTokenRefresh(): void {
    this.clearRefreshTimer();
    
    const token = this.tokenSubject.value;
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const expirationTime = payload.exp * 1000;
      const currentTime = Date.now();
      const refreshTime = expirationTime - currentTime - (5 * 60 * 1000); // Refresh 5 minutes before expiry

      if (refreshTime > 0) {
        this.refreshTimer = timer(refreshTime).subscribe(() => {
          this.refreshToken().subscribe({
            next: () => console.log('Token refreshed successfully'),
            error: (error) => console.error('Token refresh failed:', error)
          });
        });
      }
    } catch (error) {
      console.error('Error parsing token for refresh scheduling:', error);
    }
  }

  private clearRefreshTimer(): void {
    if (this.refreshTimer) {
      this.refreshTimer.unsubscribe();
      this.refreshTimer = null;
    }
  }

  clearError(): void {
    this.errorSubject.next(null);
  }

  // Getter methods
  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  get token(): string | null {
    return this.tokenSubject.value;
  }

  get isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  get userRole(): string | null {
    return this.currentUser?.role || null;
  }

  get isAgent(): boolean {
    return this.userRole === 'Agent';
  }

  get isBuyer(): boolean {
    return this.userRole === 'Buyer';
  }

  get isAdmin(): boolean {
    return this.userRole === 'Admin';
  }

  hasRole(role: string): boolean {
    return this.userRole === role;
  }

  hasAnyRole(roles: string[]): boolean {
    return roles.some(role => this.hasRole(role));
  }
}