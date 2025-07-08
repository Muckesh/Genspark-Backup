import { createAction, props } from '@ngrx/store';
import { 
  User, 
  AuthResponse, 
  LoginRequest, 
  RegisterAgentRequest, 
  RegisterBuyerRequest 
} from '../../models/user.model';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ request: LoginRequest }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ response: AuthResponse; user: User }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Register Agent Actions
export const registerAgent = createAction(
  '[Auth] Register Agent',
  props<{ request: RegisterAgentRequest }>()
);

export const registerAgentSuccess = createAction(
  '[Auth] Register Agent Success',
  props<{ response: AuthResponse; user: User }>()
);

export const registerAgentFailure = createAction(
  '[Auth] Register Agent Failure',
  props<{ error: string }>()
);

// Register Buyer Actions
export const registerBuyer = createAction(
  '[Auth] Register Buyer',
  props<{ request: RegisterBuyerRequest }>()
);

export const registerBuyerSuccess = createAction(
  '[Auth] Register Buyer Success',
  props<{ response: AuthResponse; user: User }>()
);

export const registerBuyerFailure = createAction(
  '[Auth] Register Buyer Failure',
  props<{ error: string }>()
);

// Refresh Token Actions
export const refreshToken = createAction('[Auth] Refresh Token');

export const refreshTokenSuccess = createAction(
  '[Auth] Refresh Token Success',
  props<{ response: AuthResponse }>()
);

export const refreshTokenFailure = createAction(
  '[Auth] Refresh Token Failure',
  props<{ error: string }>()
);

// Logout Actions
export const logout = createAction('[Auth] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');

// Load Current User Actions
export const loadCurrentUser = createAction('[Auth] Load Current User');

export const loadCurrentUserSuccess = createAction(
  '[Auth] Load Current User Success',
  props<{ user: User }>()
);

export const loadCurrentUserFailure = createAction(
  '[Auth] Load Current User Failure',
  props<{ error: string }>()
);

// Clear Error Action
export const clearError = createAction('[Auth] Clear Error');

// Initialize Auth
export const initializeAuth = createAction('[Auth] Initialize Auth');