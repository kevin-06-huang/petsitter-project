import { Notification } from './Notification';

export interface NotificationApiDataGet {
    notification: Notification;
}

export interface NotificationApiDataGetAll {
    notifications: [Notification];
}

export interface NotificationApiDataPost {
    type: string;
    description: string;
    read: boolean;
    createdBy: string;
    receivedBy: string;
}

export interface NotificationApiData {
    error?: { message: string };
    success?: NotificationApiDataGet | NotificationApiDataGetAll | NotificationApiDataPost | { message: string };
}