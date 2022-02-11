import { NotificationApiData } from '../../interface/NotificationApiData';
import { FetchOptions } from '../../interface/FetchOptions';
import { Notification } from '../../interface/Notification';

const postNotification = async (data: { notification: Notification }): Promise<NotificationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/profile/notification/`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default postNotification;
