import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.state';

export const selectUserState = createFeatureSelector<UserState>('user');

export const selectUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

export const selectAgents = createSelector(
  selectUserState,
  (state: UserState) => state.agents
);

export const selectBuyers = createSelector(
  selectUserState,
  (state: UserState) => state.buyers
);

export const selectUserLoading = createSelector(
  selectUserState,
  (state: UserState) => state.isLoading
);

export const selectUserError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

export const selectUserItems = createSelector(
  selectUsers,
  (users) => users?.items || []
);

export const selectAgentItems = createSelector(
  selectAgents,
  (agents) => agents?.items || []
);

export const selectBuyerItems = createSelector(
  selectBuyers,
  (buyers) => buyers?.items || []
);

export const selectUsersPagination = createSelector(
  selectUsers,
  (users) => users ? {
    pageNumber: users.pageNumber,
    pageSize: users.pageSize,
    totalCount: users.totalCount,
    totalPages: Math.ceil(users.totalCount / users.pageSize)
  } : null
);

export const selectAgentsPagination = createSelector(
  selectAgents,
  (agents) => agents ? {
    pageNumber: agents.pageNumber,
    pageSize: agents.pageSize,
    totalCount: agents.totalCount,
    totalPages: Math.ceil(agents.totalCount / agents.pageSize)
  } : null
);

export const selectBuyersPagination = createSelector(
  selectBuyers,
  (buyers) => buyers ? {
    pageNumber: buyers.pageNumber,
    pageSize: buyers.pageSize,
    totalCount: buyers.totalCount,
    totalPages: Math.ceil(buyers.totalCount / buyers.pageSize)
  } : null
);