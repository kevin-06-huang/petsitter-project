const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  // generally, there should be three broad categories of notification: notifications for messages, notifications for payment
  // activity, notifications for appointment activity and notifications for account activity (login/logout)
  type: {
    type: String,
    enum: ['account', 'appointment', 'messages', 'payment'],
    lowercase: true,
  },
  description: {
    type: String,
    default: "",
  },
  read: {
    type: Boolean,
    default: false,
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  creatorName: {
    type: String,
    default: "",
  },
  creatorPhotoKey: {
    type: String,
    default: "",
  },
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
}, { timestamps: true });

module.exports = Notification = mongoose.model("Notification", notificationSchema);
