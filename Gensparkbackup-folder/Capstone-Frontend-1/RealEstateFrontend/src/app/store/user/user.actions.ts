import { createAction, props } from '@ngrx/store';
import { 
  User, 
  Agent, 
  Buyer, 
  PagedResult,
  UserQuery,
  AgentQuery,
  BuyerQuery,
  UpdateUserRequest,
  UpdateAgentRequest,
  UpdateBuyerRequest,
  ChangePasswordRequest
} from '../../models/user.model';

// Load Users
export const loadUsers = createAction(
  '[User] Load Users',
  props<{ query: UserQuery }>()
);

export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: PagedResult<User> }>()
);

export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

// Load Agents
export const loadAgents = createAction(
  '[User] Load Agents',
  props<{ query: AgentQuery }>()
);

export const loadAgentsSuccess = createAction(
  '[User] Load Agents Success',
  props<{ agents: PagedResult<Agent> }>()
);

export const loadAgentsFailure = createAction(
  '[User] Load Agents Failure',
  props<{ error: string }>()
);

// Load Buyers
export const loadBuyers = createAction(
  '[User] Load Buyers',
  props<{ query: BuyerQuery }>()
);

export const loadBuyersSuccess = createAction(
  '[User] Load Buyers Success',
  props<{ buyers: PagedResult<Buyer> }>()
);

export const loadBuyersFailure = createAction(
  '[User] Load Buyers Failure',
  props<{ error: string }>()
);

// Update User
export const updateUser = createAction(
  '[User] Update User',
  props<{ id: string; request: UpdateUserRequest }>()
);

export const updateUserSuccess = createAction(
  '[User] Update User Success',
  props<{ user: User }>()
);

export const updateUserFailure = createAction(
  '[User] Update User Failure',
  props<{ error: string }>()
);

// Update Agent
export const updateAgent = createAction(
  '[User] Update Agent',
  props<{ id: string; request: UpdateAgentRequest }>()
);

export const updateAgentSuccess = createAction(
  '[User] Update Agent Success',
  props<{ agent: Agent }>()
);

export const updateAgentFailure = createAction(
  '[User] Update Agent Failure',
  props<{ error: string }>()
);

// Update Buyer
export const updateBuyer = createAction(
  '[User] Update Buyer',
  props<{ id: string; request: UpdateBuyerRequest }>()
);

export const updateBuyerSuccess = createAction(
  '[User] Update Buyer Success',
  props<{ buyer: Buyer }>()
);

export const updateBuyerFailure = createAction(
  '[User] Update Buyer Failure',
  props<{ error: string }>()
);

// Change Password
export const changePassword = createAction(
  '[User] Change Password',
  props<{ id: string; request: ChangePasswordRequest }>()
);

export const changePasswordSuccess = createAction(
  '[User] Change Password Success'
);

export const changePasswordFailure = createAction(
  '[User] Change Password Failure',
  props<{ error: string }>()
);

// Delete User
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);

export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string }>()
);

export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>()
);

// Clear Error
export const clearError = createAction('[User] Clear Error');