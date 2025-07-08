import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import * as AuthActions from './auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private apiService: ApiService,
    private router: Router
  ) {}

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.login),
      switchMap(({ request }) =>
        this.apiService.login(request).pipe(
          switchMap((response) =>
            this.apiService.getCurrentUser().pipe(
              map((user) => AuthActions.loginSuccess({ response, user }))
            )
          ),
          catchError((error) =>
            of(AuthActions.loginFailure({ error: error.message || 'Login failed' }))
          )
        )
      )
    )
  );

  registerAgent$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerAgent),
      switchMap(({ request }) =>
        this.apiService.registerAgent(request).pipe(
          switchMap((response) =>
            this.apiService.getCurrentUser().pipe(
              map((user) => AuthActions.registerAgentSuccess({ response, user }))
            )
          ),
          catchError((error) =>
            of(AuthActions.registerAgentFailure({ error: error.message || 'Registration failed' }))
          )
        )
      )
    )
  );

  registerBuyer$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerBuyer),
      switchMap(({ request }) =>
        this.apiService.registerBuyer(request).pipe(
          switchMap((response) =>
            this.apiService.getCurrentUser().pipe(
              map((user) => AuthActions.registerBuyerSuccess({ response, user }))
            )
          ),
          catchError((error) =>
            of(AuthActions.registerBuyerFailure({ error: error.message || 'Registration failed' }))
          )
        )
      )
    )
  );

  refreshToken$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.refreshToken),
      switchMap(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (!refreshToken) {
          return of(AuthActions.refreshTokenFailure({ error: 'No refresh token available' }));
        }
        
        return this.apiService.refreshToken({ refreshToken }).pipe(
          map((response) => AuthActions.refreshTokenSuccess({ response })),
          catchError((error) =>
            of(AuthActions.refreshTokenFailure({ error: error.message || 'Token refresh failed' }))
          )
        );
      })
    )
  );

  logout$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.logout),
      tap(() => {
        const refreshToken = localStorage.getItem('refresh_token');
        if (refreshToken) {
          this.apiService.logout({ refreshToken }).subscribe({
            next: () => console.log('Logout successful'),
            error: (error) => console.error('Logout error:', error)
          });
        }
        
        // Clear localStorage
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('current_user');
      }),
      map(() => AuthActions.logoutSuccess())
    )
  );

  loadCurrentUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loadCurrentUser),
      switchMap(() =>
        this.apiService.getCurrentUser().pipe(
          map((user) => AuthActions.loadCurrentUserSuccess({ user })),
          catchError((error) =>
            of(AuthActions.loadCurrentUserFailure({ error: error.message || 'Failed to load user' }))
          )
        )
      )
    )
  );

  // Navigate after successful login/registration
  navigateAfterAuth$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.registerAgentSuccess,
          AuthActions.registerBuyerSuccess
        ),
        tap(() => {
          this.router.navigate(['/dashboard']);
        })
      ),
    { dispatch: false }
  );

  // Navigate after logout
  navigateAfterLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logoutSuccess),
        tap(() => {
          this.router.navigate(['/login']);
        })
      ),
    { dispatch: false }
  );

  // Store auth data after successful login/registration
  storeAuthDataWithUser$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(
          AuthActions.loginSuccess,
          AuthActions.registerAgentSuccess,
          AuthActions.registerBuyerSuccess
        ),
        tap((action) => {
          localStorage.setItem('access_token', action.response.token);
          localStorage.setItem('refresh_token', action.response.refreshToken);
          localStorage.setItem('current_user', JSON.stringify(action.user));
        })
      ),
    { dispatch: false }
  );

  // Store auth data after token refresh (no user data)
  storeAuthDataTokenOnly$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.refreshTokenSuccess),
        tap((action) => {
          localStorage.setItem('access_token', action.response.token);
          localStorage.setItem('refresh_token', action.response.refreshToken);
        })
      ),
    { dispatch: false }
  );
}