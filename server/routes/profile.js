const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
  getAllSitters,
  searchProfiles
} = require('../controllers/profile');
const notificationRouter = require('../routes/notification');

router.route("/edit").put(protect, editProfile);
router.route("/load/:userId").get(protect, loadProfile);
router.route('/sitters').get(getAllSitters);
router.route("/search/").get(protect, searchProfiles);
router.route("/search/:searchString").get(protect, searchProfiles);
router.use("/notifications", notificationRouter);

module.exports = router;
