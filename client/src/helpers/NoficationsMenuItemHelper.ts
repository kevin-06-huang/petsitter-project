import { NotificationResourceType, NotificationDescriptiveType } from '../types/NotificationType';
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

export function formatMMDDYYYY(date: Date): string {
  const month = date.getMonth() < 10 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1).toString();
  const day = date.getDate() < 10 ? '0' + date.getDate().toString() : date.getDate().toString();
  const year = date.getFullYear().toString();

  return month + '/' + day + '/' + year;
}

export function getDescriptiveType(type: string): string {
  switch (type) {
    case 'account': {
      return NotificationDescriptiveType.account;
    }
    case 'appointment': {
      return NotificationDescriptiveType.appointment;
    }
    case 'message': {
      return NotificationDescriptiveType.message;
    }
    case 'payment': {
      return NotificationDescriptiveType.payment;
    }
    default: {
      return NotificationDescriptiveType.account;
    }
  }
}
