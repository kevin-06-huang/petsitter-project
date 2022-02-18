import { NotificationResourceType } from '../types/NotificationType';
import { Notification } from '../interface/Notification';

export function getWindowDimensions(): { height: number; width: number } {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height,
  };
}
export function getResource(notification: Notification): string {
  switch (notification.type) {
    case 'account': {
      return NotificationResourceType.account;
    }
    case 'appointment': {
      return NotificationResourceType.appointment;
    }
    case 'message': {
      return NotificationResourceType.message;
    }
    case 'payment': {
      return NotificationResourceType.payment;
    }
    default: {
      return '#';
    }
  }
}

export function unreadNotifications(notifications: [Notification]): Notification[] {
  return notifications
    ? notifications.filter((notification) => {
        return !notification.read;
      })
    : [];
}
