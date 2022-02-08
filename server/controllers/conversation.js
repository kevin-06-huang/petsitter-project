

const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
// @route Post /create
// @desc create conversation
// @access Public
exports.createConversation = asyncHandler(async (req, res, next) => {
  const userId = await User.findById(req.user.id);
  if (!userId) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const senderId = req.user.id;
  const { recipientId, text, conversationId } = req.body;
  if (conversationId) {
    const message = await Message.create({ senderId, text, conversationId });
    return res.json({ message });
  }

  let conversation = await Conversation.findOne({ senderId, recipientId });
  if (conversation) {
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation._id
    })
    res.status(200).json({
      success: {
        message: message,
        conversation: conversation._id
      },
    });
  }
  else {
    conversation = await Conversation.create({
      senderId, recipientId
    })
    const newMessage = await Message.create({
      senderId,
      text,
      conversationId: conversation._id
    })
    res.status(200).json({
      success: {
        message: newMessage,
        conversation: conversation._id
      },
    });
  }
});


// @route Post /send
// @desc send message
// @access Public
exports.sendMessage = asyncHandler(async (req, res, next) => {
  const userId = await User.findById(req.user.id);
  if (!userId) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const senderId = req.user.id;
  const { text, conversationId } = req.body;

  let conversation = await Conversation.findOne(conversationId);
  if (conversation) {
    const message = await Message.create({
      senderId,
      text,
      conversationId
    })
    res.status(200).json({
      success: {
        message: message,
        conversation: conversation._id
      },
    });
  }

});


// @route GET /all
// @desc send message
// @access Public
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const userId = await User.findById(req.user.id);
  if (!userId) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const senderId = req.user.id;
  let conversation = await Conversation.find({ $or: [{ userId1: senderId }, { userId2: senderId }] }).populate({
    path: "messages",
    sort: { createdAt: "desc" };
  })
  res.status(200).json({
    success: {
      message: message,
      conversation: conversation._id
    },
  });
});

// @route GET /message/:conversationId
// @desc send message
// @access Public
exports.getAllMessages = asyncHandler(async (req, res, next) => {
  const conversationId = req.params.conversationId;
  let messages = await Message.find(conversationId).sort(createdAt, 'asc');
  res.status(200).json({
    success: {
      message: messages
    },
  });
});

