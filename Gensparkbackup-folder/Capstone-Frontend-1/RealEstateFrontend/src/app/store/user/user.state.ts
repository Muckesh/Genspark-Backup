import { User, Agent, Buyer, PagedResult } from '../../models/user.model';

export interface UserState {
  users: PagedResult<User> | null;
  agents: PagedResult<Agent> | null;
  buyers: PagedResult<Buyer> | null;
  isLoading: boolean;
  error: string | null;
}

export const initialUserState: UserState = {
  users: null,
  agents: null,
  buyers: null,
  isLoading: false,
  error: null
};