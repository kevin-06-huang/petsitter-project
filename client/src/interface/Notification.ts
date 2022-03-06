export interface Notification {
    type: string;
    description: string;
    read: boolean;
    createdBy: string;
    receivedBy: string;
    updatedAt: Date;
    _id?: string;
}
