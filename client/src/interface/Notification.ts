export interface Notification {
    type: string;
    description: string;
    read: boolean;
    dateCreated: Date;
    createdBy: string;
    receivedBy: string;
}
