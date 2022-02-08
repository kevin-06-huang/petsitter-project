const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  sendMessage,
  getAllConversations,
  getAllMessages,
} = require("../controllers/conversation");

router.route("/create-conversation").post(protect, createConversation);

router.route("/send").post(protect, sendMessage);

router.route("/all").get(getAllConversations);

router.route("/all/:conversationId").post(getAllMessages);

module.exports = router;
