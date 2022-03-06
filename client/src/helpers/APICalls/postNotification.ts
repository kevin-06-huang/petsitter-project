import { NotificationApiData } from '../../interface/NotificationApiData';
import { FetchOptions } from '../../interface/FetchOptions';

const postNotification = async (data: {
  type: string;
  description: string;
  read: boolean;
  createdBy: string;
  receivedBy: string;
}): Promise<NotificationApiData> => {
  const fetchOptions: FetchOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
    credentials: 'include',
  };
  return await fetch(`/profile/notifications`, fetchOptions)
    .then((res) => res.json())
    .catch(() => ({
      error: { message: 'Unable to connect to server. Please try again' },
    }));
};

export default postNotification;
