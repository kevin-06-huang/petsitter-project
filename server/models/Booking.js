const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    petOwner: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    sitter: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    startDate: {
      type: Date,
      required: true,
    },
    endDate: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "declined"],
      default: "pending",
      lowercase: true,
    },
    paid: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = Booking = mongoose.model("Booking", bookingSchema);
