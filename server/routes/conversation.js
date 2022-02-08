const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const {
  createConversation,
  sendMessage,
  getAllConversations,
  getAllMessages,
} = require("../controllers/conversation");

router.route("/create").post(protect,createConversation);

router.route("/send").post(protect,sendMessage);

router.route("/all").get(getAllConversations);

router.route("/messages/:conversationId").get(getAllMessages);

module.exports = router;
