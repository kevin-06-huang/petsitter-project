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