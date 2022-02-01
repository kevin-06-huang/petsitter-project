const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createNotification, readNotification, getAll, getUnread
} = require('../controllers/notification');

router.route('/create').post(protect, createNotification);
router.route('/:key').put(protect, readNotification);
router.route('/all').get(protect, getAll);
router.route('/unread').get(protect, getUnread);

module.exports = router;