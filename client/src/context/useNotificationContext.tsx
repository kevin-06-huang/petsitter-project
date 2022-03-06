import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback, useEffect } from 'react';
import { Notification } from '../interface/Notification';
import { useAuth } from './useAuthContext';
import getNotifications from '../helpers/APICalls/getNofitications';
import postNotification from '../helpers/APICalls/postNotification';
import { NotificationApiData } from '../interface/NotificationApiData';
import { useSnackBar } from './useSnackbarContext';

interface NotificationContext {
  notifications: [Notification] | undefined;
  pushNotification: (data: { notification: Notification }) => void;
}

export const NotificationContext = createContext<NotificationContext>({
  notifications: undefined,
  pushNotification: () => null,
});

export const NotificationContextProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<[Notification] | undefined>(undefined);
  const { profile } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const pushNotification = useCallback(
    (data: { notification: Notification }) => {
      notifications!.push(data.notification);
      postNotification(data);
    },
    [notifications],
  );

  useEffect(() => {
    const updateNotifications = async (userId: string) => {
      await getNotifications(userId).then((data: NotificationApiData) => {
        if (data.success) {
          setNotifications(data.success.notifications);
          updateSnackBarMessage('You have new notifications!');
        } else {
          if (data.error) updateSnackBarMessage(data.error.message);
        }
      });
    };
    profile && updateNotifications(profile.userId);
  }, [profile, updateSnackBarMessage]);

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification }}>{children}</NotificationContext.Provider>
  );
};

export function useNotificationContext(): NotificationContext {
  return useContext(NotificationContext);
}
