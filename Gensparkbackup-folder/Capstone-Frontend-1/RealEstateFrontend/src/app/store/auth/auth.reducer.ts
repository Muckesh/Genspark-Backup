import { createReducer, on } from '@ngrx/store';
import { AuthState, initialAuthState } from './auth.state';
import * as AuthActions from './auth.actions';

export const authReducer = createReducer(
  initialAuthState,
  
  // Login
  on(AuthActions.login, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(AuthActions.loginSuccess, (state, { response, user }) => ({
    ...state,
    user,
    token: response.token,
    refreshToken: response.refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  
  on(AuthActions.loginFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Register Agent
  on(AuthActions.registerAgent, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(AuthActions.registerAgentSuccess, (state, { response, user }) => ({
    ...state,
    user,
    token: response.token,
    refreshToken: response.refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  
  on(AuthActions.registerAgentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Register Buyer
  on(AuthActions.registerBuyer, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(AuthActions.registerBuyerSuccess, (state, { response, user }) => ({
    ...state,
    user,
    token: response.token,
    refreshToken: response.refreshToken,
    isAuthenticated: true,
    isLoading: false,
    error: null
  })),
  
  on(AuthActions.registerBuyerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Refresh Token
  on(AuthActions.refreshToken, (state) => ({
    ...state,
    isLoading: true
  })),
  
  on(AuthActions.refreshTokenSuccess, (state, { response }) => ({
    ...state,
    token: response.token,
    refreshToken: response.refreshToken,
    isLoading: false,
    error: null
  })),
  
  on(AuthActions.refreshTokenFailure, (state, { error }) => ({
    ...state,
    user: null,
    token: null,
    refreshToken: null,
    isAuthenticated: false,
    isLoading: false,
    error
  })),
  
  // Logout
  on(AuthActions.logout, (state) => ({
    ...state,
    isLoading: true
  })),
  
  on(AuthActions.logoutSuccess, (state) => ({
    ...initialAuthState
  })),
  
  // Load Current User
  on(AuthActions.loadCurrentUser, (state) => ({
    ...state,
    isLoading: true
  })),
  
  on(AuthActions.loadCurrentUserSuccess, (state, { user }) => ({
    ...state,
    user,
    isLoading: false
  })),
  
  on(AuthActions.loadCurrentUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Clear Error
  on(AuthActions.clearError, (state) => ({
    ...state,
    error: null
  })),
  
  // Initialize Auth
  on(AuthActions.initializeAuth, (state) => {
    const token = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');
    const userData = localStorage.getItem('current_user');
    
    if (token && refreshToken && userData) {
      try {
        const user = JSON.parse(userData);
        return {
          ...state,
          user,
          token,
          refreshToken,
          isAuthenticated: true
        };
      } catch (error) {
        return state;
      }
    }
    
    return state;
  })
);