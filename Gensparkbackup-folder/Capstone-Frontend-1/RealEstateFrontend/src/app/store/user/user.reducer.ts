import { createReducer, on } from '@ngrx/store';
import { UserState, initialUserState } from './user.state';
import * as UserActions from './user.actions';

export const userReducer = createReducer(
  initialUserState,
  
  // Load Users
  on(UserActions.loadUsers, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.loadUsersSuccess, (state, { users }) => ({
    ...state,
    users,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Load Agents
  on(UserActions.loadAgents, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.loadAgentsSuccess, (state, { agents }) => ({
    ...state,
    agents,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.loadAgentsFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Load Buyers
  on(UserActions.loadBuyers, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.loadBuyersSuccess, (state, { buyers }) => ({
    ...state,
    buyers,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.loadBuyersFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Update User
  on(UserActions.updateUser, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.updateUserSuccess, (state, { user }) => ({
    ...state,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.updateUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Update Agent
  on(UserActions.updateAgent, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.updateAgentSuccess, (state, { agent }) => ({
    ...state,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.updateAgentFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Update Buyer
  on(UserActions.updateBuyer, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.updateBuyerSuccess, (state, { buyer }) => ({
    ...state,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.updateBuyerFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Change Password
  on(UserActions.changePassword, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.changePasswordSuccess, (state) => ({
    ...state,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.changePasswordFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Delete User
  on(UserActions.deleteUser, (state) => ({
    ...state,
    isLoading: true,
    error: null
  })),
  
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users ? {
      ...state.users,
      items: state.users.items.filter(user => user.id !== id)
    } : null,
    isLoading: false,
    error: null
  })),
  
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  
  // Clear Error
  on(UserActions.clearError, (state) => ({
    ...state,
    error: null
  }))
);