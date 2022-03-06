import { BookingInfo } from '../../interface/BookingInfo';
import { BookingApiData } from '../../interface/BookingApiData';
import { FetchOptions } from '../../interface/FetchOptions';

export async function getBookings(): Promise<BookingApiData> {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    credentials: 'include',
  };
  return await fetch(`/bookings`, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function makeBooking(bookingInfo: BookingInfo): Promise<BookingApiData> {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ booking: bookingInfo }),
    credentials: 'include',
  };
  return await fetch(`/bookings`, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}

export async function updateBooking(id: string | undefined, data: any): Promise<BookingApiData> {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ data: data }),
    credentials: 'include',
  };
  return await fetch(`/bookings/${id}`, fetchOptions)
    .then((res) => {
      return res.json();
    })
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
}
