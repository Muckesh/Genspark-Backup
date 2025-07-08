import { AuthState } from './auth/auth.state';
import { PropertyState } from './property/property.state';
import { UserState } from './user/user.state';

export interface AppState {
  auth: AuthState;
  property: PropertyState;
  user: UserState;
}