import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback, useEffect } from 'react';
import { Notification } from '../interface/Notification';
import { useAuth } from './useAuthContext';
import getNotifications from '../helpers/APICalls/getNofitications';
import { NotificationApiData, NotificationApiDataGetAll } from '../interface/NotificationApiData';

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

  const pushNotification = useCallback((notification: Notification) => {
    notifications!.push(notification);
    //api call to database update
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const updateNotifications = async (userId: string) => {
      await getNotifications(userId).then((data: NotificationApiData) => {
        if (data.success) {
          setNotifications(data.success.notifications);
        } else {
          // can use snackbar here?
          console.log(data.error!.message);
        }
      });
    };
    profile && updateNotifications(profile.userId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification }}>{children}</NotificationContext.Provider>
  );
};

export function useNotificationContext(): INotificationContext {
  return useContext(NotificationContext);
}
