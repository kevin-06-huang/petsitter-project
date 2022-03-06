const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res) => {
    const { type, description, receivedBy } = req.body
    const userId = req.user.id
    
    const profile = await Profile.find({ userId: userId });
    if (!profile) {
        return res.status(404).send("No Profile Found")
    }

    const newNotification = await Notification.create({
        type,
        description,
        receivedBy,
        createdBy: profile[0].userId.toString()
    });

    res.status(201).json({
        success: {
            notification: newNotification
        }
    });
});
exports.readNotifications = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Notification
        .updateMany({ receivedBy: id }, { $set: { read: true } })
        .then(res.status(200).json({
            success: {
                message: 'Notifications read.',
            },
        }));
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