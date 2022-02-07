const Notification = require("../models/Notification");
const asyncHandler = require("express-async-handler");
// createNotification, readNotification, getAll, getUnread
// @route POST /image/upload
// @desc Upload image(s)
// @access Private
exports.createNotification = asyncHandler(async (req, res) => {
    res.status(200);
});
exports.readNotification = asyncHandler(async (req, res) => {
    res.status(200);
});
exports.getAll = asyncHandler(async (req, res) => {
    /*const { id } = req.params;
    await Notification.find({ receivedBy: id }, (err, notifications) => {
        notifications.forEach(notification => {
            console.log(notification.description);
        });
    });*/
    res.status(200).json({
        success: {
          notifications: undefined,
        },
      });
});
exports.getUnread = asyncHandler(async (req, res) => {
    res.status(200);
});