import { AuthApiData } from '../../interface/AuthApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const createSchedule = async (data: {
  name: string;
  days: {
    monday: {
      active: boolean;
      startTime: string;
      endTime: string;
    };
    tuesday: {
      active: boolean;
      startTime: string;
      endTime: string;
    };
    wednesday: {
      active: boolean;
      startTime: string;
      endTime: string;
    };
    thursday: {
      active: boolean;
      startTime: string;
      endTime: string;
    };
    friday: {
      active: boolean;
      startTime: string;
      endTime: string;
    };
    saturday: {
      active: boolean;
      startTime: string;
      endTime: string;
    };
    sunday: {
      active: boolean;
      startTime: string;
      endTime: string;
    };
  };
}): Promise<AuthApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/availability/create`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default createSchedule;
