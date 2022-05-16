import Decimal from 'decimal.js';
import { Profile } from './Profile';

export interface ProfileApiDataSuccess {
  profiles: Profile[];
}

export interface ProfileApiData {
  error?: { message: string };
  success?: ProfileApiDataSuccess;
}
