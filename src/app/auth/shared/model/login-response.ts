import {UserType} from './user-type';

export interface LoginResponse {
  id?: number;
  authenticationToken?: string;
  name?: string;
  email?: string;
  type?: UserType;
}
