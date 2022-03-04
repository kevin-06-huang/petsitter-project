import { User } from './User';

export interface BookingInfo {
  _id: string | undefined;
  petOwner?: User;
  sitter: User | string;
  startDate: Date;
  endDate: Date;
  status: string;
  paid: boolean;
}
