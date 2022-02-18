import { NotificationApiData } from '../../interface/NotificationApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { Notification } from '../../interface/Notification';

const patchNotifications = async (): Promise<void> => {
  const fetchOptions: FetchOptions = {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
  };
  return await fetch(`/profile/notifications`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default patchNotifications;
