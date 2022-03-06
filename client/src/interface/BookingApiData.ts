import { BookingInfo } from './BookingInfo';

export interface BookingApiData {
  error?: { message: string };
  success?: { bookingInfo?: BookingInfo; bookingInfos?: BookingInfo[] };
}
