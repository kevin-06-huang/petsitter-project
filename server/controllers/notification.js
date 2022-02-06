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
    res.status(200);
});
exports.getUnread = asyncHandler(async (req, res) => {
    res.status(200);
});