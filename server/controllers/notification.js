const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");

exports.createNotification = asyncHandler(async (req, res) => {
    const { type, description, receivedBy } = JSON.parse(req.body)
    const userId = req.user.id
    
    const profile = Profile.findById(userId);
    
    if (!profile) {
        return res.status(404).send("No Profile Found")
    }
    
    const newNotifcation = await Notification.create({
        type,
        description,
        receivedBy,
        createdBy: profile._id
    })
    
    return res.status(201).json({
        success: {
            notification: newNotification
        }
    })
    
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