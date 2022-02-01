const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers } = require("../controllers/user");
const notificationRouter = require('../routes/notification');

router.route("/").get(protect, searchUsers);
router.route("/notification", notificationRouter);

module.exports = router;
