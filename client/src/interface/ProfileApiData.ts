export interface Profile {
  name: string;
  gender: string;
  birthDate: Date | null;
  phoneNumber: string;
  address: string;
  description: string;
  _id?: string;
  price?: number;
  rating?: number;
  tagLine?: string;
}

export interface ProfileApiDataSuccess {
  profiles?: Profile[];
}

export interface ProfileApiData {
  error?: string;
  success?: ProfileApiDataSuccess;
}
