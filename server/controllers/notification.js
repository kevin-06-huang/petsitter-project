const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");
// createNotification, readNotification, getAll, getUnread
exports.createNotification = asyncHandler(async (req, res) => {
    const notification = JSON.parse(req.body)
    try{
        notification.save()
        .then(res.status(200));
    } catch (error) {
        res.json(error);
    }
});
exports.readNotification = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        Notification
        .updateAll({ receivedBy: id }, { $set: {  read: true } })
        .then(res.status(200));
    } catch (error) {
        res.json(error);
    }
});
exports.getAll = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        Notification.find({ receivedBy: id }, (err, notifications) => {
            res.status(200).json({
                success: {
                    notifications: notifications,
                },
            });
        });
    } catch (error) {
        res.json(error);
    };
});
exports.getUnread = asyncHandler(async (req, res) => {
    const { id } = req.params;
    try {
        Notification.find({ receivedBy: id, read: false, }, (err, notifications) => {
            res.status(200).json({
                success: {
                  notifications: notifications,
                },
              });
        });
    } catch (error) {
        res.json(error);
    }
});