import { HttpInterceptorFn, HttpErrorResponse, HttpHandlerFn, HttpEvent, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable, catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { jwtDecode } from 'jwt-decode';

export const tokenInterceptor: HttpInterceptorFn = (request, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  let isRefreshing = false;

  // Skip token for whitelisted routes
  if (environment.tokenWhitelist.some(path => request.url.includes(path))) {
    return next(request);
  }

  const token = localStorage.getItem('access_token');
  const refreshToken = localStorage.getItem('refresh_token');

  const reqWithToken = token ? addTokenHeader(request, token) : request;

  return next(reqWithToken).pipe(
    catchError(error => {
      if (error instanceof HttpErrorResponse && error.status === 401 && refreshToken) {
        return handle401Error(request, next, refreshToken, authService, router, isRefreshing);
      }
      return throwError(() => error);
    })
  );
};

function addTokenHeader(request: HttpRequest<any>, token: string): HttpRequest<any> {
  return request.clone({
    setHeaders: {
      Authorization: `Bearer ${token}`
    }
  });
}

function handle401Error(
  request: HttpRequest<any>,
  next: HttpHandlerFn,
  refreshToken: string,
  authService: AuthService,
  router: Router,
  isRefreshing: boolean
): Observable<HttpEvent<any>> {
  if (!isRefreshing) {
    isRefreshing = true;

    return authService.refreshToken(refreshToken).pipe(
      switchMap((response: any) => {
        isRefreshing = false;
        localStorage.setItem('access_token', response.token);
        localStorage.setItem('refresh_token', response.refreshToken);
        return next(addTokenHeader(request, response.token));
      }),
      catchError(err => {
        isRefreshing = false;
        router.navigate(['/login']);
        return throwError(() => err);
      })
    );
  }

  return next(request);
}


