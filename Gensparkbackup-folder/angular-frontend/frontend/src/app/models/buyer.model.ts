import { User } from './user.model';

export interface Buyer {
  id: string;
  preferredLocation: string;
  budget: number;
  user?: User;
}

export interface RegisterBuyerDto {
  name: string;
  email: string;
  password: string;
  preferredLocation: string;
  budget: number;
}