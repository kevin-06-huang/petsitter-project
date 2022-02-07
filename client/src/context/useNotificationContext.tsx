import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback, useEffect } from 'react';
import { Notification } from '../interface/Notification';
import { useAuth } from './useAuthContext';
import getNotifications from '../helpers/APICalls/getNofitications';
import { NotificationApiData } from '../interface/NotificationApiData';
import { useSnackBar } from './useSnackbarContext';

interface INotificationContext {
  notifications: [Notification] | undefined;
  pushNotification: (notification: Notification) => void;
}

export const NotificationContext = createContext<INotificationContext>({
  notifications: undefined,
  pushNotification: () => null,
});

export const NotificationContextProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<[Notification] | undefined>(undefined);
  const { profile } = useAuth();
  const { updateSnackBarMessage } = useSnackBar();

  const pushNotification = useCallback(
    (notification: Notification) => {
      notifications!.push(notification);
      //api call to database update
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

export function useNotificationContext(): INotificationContext {
  return useContext(NotificationContext);
}
