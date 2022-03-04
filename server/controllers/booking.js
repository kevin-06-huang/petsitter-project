const Booking = require("../models/Booking");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route GET /bookings
// @desc list of bookings
// @access Private
exports.getBookings = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  let bookings;
  if (profile.accountType === "pet_owner") {
    bookings = await Booking.find({ petOwner: req.user.id }).populate([
      "petOwner",
      "sitter",
    ]);
  } else {
    bookings = await Booking.find({ sitter: req.user.id }).populate([
      "petOwner",
      "sitter",
    ]);
  }

  res.status(200).json({
    success: {
      bookingInfos: bookings,
    },
  });
});

// @route POST /bookings
// @desc Create a new booking
// @access Private
exports.makeBooking = asyncHandler(async (req, res, next) => {
  const { sitter, startDate, endDate } = req.booking;
  const booking = new Booking({
    sitter,
    startDate,
    endDate,
    petOwner: req.user.id,
  });

  const newBooking = await Booking.create(booking);

  res.status(200).json({
    success: {
      bookingInfo: newBooking,
    },
  });
});

// @route PATCH /bookings
// @desc Update booking with approved or decline
// @access Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
  const { status } = req.body.data;
  const booking = await Booking.findByIdAndUpdate(
    req.params.bookingId,
    { status: status },
    { returnDocument: "after" }
  );

  if (!booking) {
    res.status(404);
    throw new Error("Booking doesn't exist");
  }

  res.status(200).json({
    success: {
      bookingInfo: booking,
    },
  });
});
