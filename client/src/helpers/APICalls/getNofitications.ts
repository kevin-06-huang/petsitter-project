import { NotificationApiData } from '../../interface/NotificationApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const getNotifications = async (userId: string): Promise<NotificationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profile/notification/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default getNotifications;
