const express = require("express");
const {
  getBookings,
  makeBooking,
  updateBooking,
} = require("../controllers/booking");
const protect = require("../middleware/auth");
const bookingValidation = require("../middleware/booking");
const router = express.Router();

router.route("/").get(protect, getBookings);
router.route("/").post(protect, bookingValidation, makeBooking);
router.route("/:bookingId").patch(protect, updateBooking);

module.exports = router;
