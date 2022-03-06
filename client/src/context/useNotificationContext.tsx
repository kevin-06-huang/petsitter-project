import { useState, useContext, createContext, FunctionComponent, SyntheticEvent, useCallback, useEffect } from 'react';
import { Notification } from '../interface/Notification';
import { useAuth } from './useAuthContext';
import { useSocket } from './useSocketContext';
import getNotifications from '../helpers/APICalls/getNofitications';
import postNotification from '../helpers/APICalls/postNotification';
import patchNotifications from '../helpers/APICalls/patchNotifications';
import {
  NotificationApiData,
  NotificationApiDataGet,
  NotificationApiDataGetAll,
  NotificationApiDataPost,
} from '../interface/NotificationApiData';
import { useSnackBar } from './useSnackbarContext';

interface NotificationContext {
  notifications: [Notification] | undefined;
  pushNotification: (data: NotificationApiDataPost) => void;
  readNotifications: () => void;
}

export const NotificationContext = createContext<NotificationContext>({
  notifications: undefined,
  pushNotification: () => null,
  readNotifications: () => null,
});

export const NotificationContextProvider: FunctionComponent = ({ children }): JSX.Element => {
  const [notifications, setNotifications] = useState<[Notification] | undefined>(undefined);
  const { profile } = useAuth();
  const { socket } = useSocket();
  const { updateSnackBarMessage } = useSnackBar();

  const pushNotification = useCallback(
    async (data: NotificationApiDataPost) => {
      await postNotification({
        type: data.type,
        description: data.description,
        read: data.read,
        createdBy: data.createdBy,
        receivedBy: data.receivedBy,
      }).then((data: NotificationApiData) => {
        if (data.success) {
          const { notification } = data.success as NotificationApiDataGet;
          socket?.emit('notification', notification);
        } else {
          if (data.error) updateSnackBarMessage(data.error.message);
        }
      });
    },
    [socket, updateSnackBarMessage],
  );

  const readNotifications = useCallback(async () => {
    const res = await patchNotifications();
    if (res.success) {
      if (notifications && notifications.length) {
        const newNotifications = [...notifications];
        newNotifications.forEach((notification) => (notification.read = true));
        setNotifications(newNotifications as any);
      }
    }
  }, [notifications]);

  useEffect(() => {
    const updateNotifications = async (userId: string) => {
      await getNotifications().then((data: NotificationApiData) => {
        if (data.success) {
          const notifications = (data.success as NotificationApiDataGetAll).notifications;
          setNotifications(notifications);
          socket?.on('notification', (notification) => {
            notification.updatedAt = new Date();
            notifications.push(notification);
            setNotifications(notifications);
          });
          updateSnackBarMessage('Notifications loaded!');
        } else {
          if (data.error) updateSnackBarMessage(data.error.message);
        }
      });
    };
    profile && updateNotifications(profile.userId);
  }, [profile, socket, updateSnackBarMessage]);

  return (
    <NotificationContext.Provider value={{ notifications, pushNotification, readNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotificationContext(): NotificationContext {
  return useContext(NotificationContext);
}
