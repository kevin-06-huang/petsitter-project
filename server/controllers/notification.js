const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res) => {
    const { notification } = req.body;
    mongoNotification = new Notification(notification);
    mongoNotification.save()
    .then(res.status(200));
});
exports.readNotifications = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Notification
    .updateMany({ receivedBy: id }, { $set: {  read: true } })
    .then(res.status(200));
});
exports.getAll = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Notification.find({ receivedBy: id }, (err, notifications) => {
        res.status(200).json({
            success: {
                notifications: notifications,
            },
        });
    });
});
exports.getUnread = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Notification.find({ receivedBy: id, read: false, }, (err, notifications) => {
        res.status(200).json({
            success: {
                notifications: notifications,
            },
            });
    });
});