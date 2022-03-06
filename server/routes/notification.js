const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  createNotification, readNotifications, getAll, getUnread
} = require('../controllers/notification');

router.route('/').post(protect, createNotification);
router.route('/').patch(protect, readNotifications);
router.route('/').get(protect, getAll);
router.route('/unread').get(protect, getUnread);

module.exports = router;