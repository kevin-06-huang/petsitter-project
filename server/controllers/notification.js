const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res) => {
    const {
        type,
        description,
        read,
        createdBy,
        creatorName,
        creatorPhotoKey,
        receivedBy
    } = req.body;
    notification = new Notification({
        type,
        description,
        read,
        createdBy,
        creatorName,
        creatorPhotoKey,
        receivedBy
    });
    notification.save()
        .then(res.status(200).json({
            success: {
                notification: notification
            }
        }));
});
exports.readNotifications = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Notification
        .updateMany({ receivedBy: id }, { $set: { read: true } })
        .then(res.status(200));
});
exports.getAll = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Notification.find({ receivedBy: id })
        .then((notifications) => {
            res.status(200).json({
                success: {
                    notifications: notifications,
                },
            });
        });
});
exports.getUnread = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Notificaiton.find({ receivedBy: id, read: false, })
        .then((notifications) => {
            res.status(200).json({
                success: {
                    notifications: notifications,
                },
            });
        });
});