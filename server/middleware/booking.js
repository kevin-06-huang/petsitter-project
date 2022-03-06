const bookingValidation = (req, res, next) => {
  const booking = req.body.booking;

  if (!booking.startDate || !booking.endDate) {
    res.status(400);
    throw new Error("date input error");
  } else {
    req.booking = booking;
  }

  if (!booking.sitter) {
    res.status(400);
    throw new Error("sitter doesn't exist");
  }

  next();
};

module.exports = bookingValidation;
