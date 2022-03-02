const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
  getAllSitters
} = require('../controllers/profile');
const notificationRouter = require('../routes/notification');

router.route('/edit').put(protect, editProfile);

router.route('/load').get(protect, loadProfile);

router.route('/sitters').get(getAllSitters);
router.use("/notifications", notificationRouter);

module.exports = router;