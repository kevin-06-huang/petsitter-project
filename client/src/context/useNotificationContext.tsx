import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback } from 'react';
import { Notification } from '../interface/Notification';

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

  const pushNotification = useCallback((notification: Notification) => {
    notifications!.push(notification);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification }}>{children}</NotificationContext.Provider>
  );
};

export function useNotificationContext(): INotificationContext {
  return useContext(NotificationContext);
}
