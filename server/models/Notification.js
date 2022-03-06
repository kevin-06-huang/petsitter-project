const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
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
  receivedBy: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
}, { timestamps: true });

module.exports = Notification = mongoose.model("Notification", notificationSchema);
