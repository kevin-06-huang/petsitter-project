import { User } from './User';

export interface AuthApiDataSuccess {
  message: string;
  user: User;
  profile: any;
  token: string;
}

export interface AuthApiData {
  error?: { message: string };
  success?: AuthApiDataSuccess;
}
