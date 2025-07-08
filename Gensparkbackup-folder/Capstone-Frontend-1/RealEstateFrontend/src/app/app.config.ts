import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
// import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { routes } from './app.routes';
import { authReducer } from './store/auth/auth.reducer';
import { propertyReducer } from './store/property/property.reducer';
import { userReducer } from './store/user/user.reducer';
import { AuthEffects } from './store/auth/auth.effects';
import { PropertyEffects } from './store/property/property.effects';
import { UserEffects } from './store/user/user.effects';
import { AuthInterceptor } from './services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      auth: authReducer,
      property: propertyReducer,
      user: userReducer
    }),
    provideEffects([AuthEffects, PropertyEffects, UserEffects]),
    // provideStoreDevtools({
    //   maxAge: 25,
    //   logOnly: false,
    //   autoPause: true,
    //   trace: false,
    //   traceLimit: 75
    // }),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ]
};