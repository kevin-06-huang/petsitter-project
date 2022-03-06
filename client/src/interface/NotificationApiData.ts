import { Notification } from './Notification';

export interface NotificationApiDataGetAll {
    notifications: [Notification]
;  }

export interface NotificationApiData {
    error?: { message: string };
    success?: NotificationApiDataGetAll;
}