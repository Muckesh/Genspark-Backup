import { User } from './user.model';

export interface Agent {
  id: string;
  licenseNumber: string;
  agencyName: string;
  phone: string;
  user?: User;
}

export interface RegisterAgentDto {
  name: string;
  email: string;
  password: string;
  licenseNumber: string;
  agencyName: string;
  phone: string;
}