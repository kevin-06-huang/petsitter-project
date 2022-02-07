const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  createNotification, readNotification, getAll, getUnread
} = require('../controllers/notification');

router.route('/create').post(protect, createNotification);
router.route('/read/:id').put(protect, readNotification);
router.route('/get-all/:id').get(protect, getAll);
router.route('/get-unread/:id').get(protect, getUnread);

module.exports = router;