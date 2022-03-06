import Decimal from 'decimal.js';

export interface Profile {
  name: string;
  gender: string;
  birthDate: Date | null;
  phoneNumber: string;
  address: string;
  description: string;
  _id?: string;
  price?: string;
  rating?: string;
  tagLine?: string;
  photo?: string;
}

export interface ProfileApiDataSuccess {
  profiles?: Profile[];
}

export interface ProfileApiData {
  error?: string;
  success?: ProfileApiDataSuccess;
}
