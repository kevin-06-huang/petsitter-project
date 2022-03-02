const express = require( "express" );
const router = express.Router();
const protect = require( "../middleware/auth" );
const {
  createConversation,
  sendMessage,
  getAllConversations,
  getAllMessages,
} = require( "../controllers/conversation" );

router.route( "/" ).post( protect, createConversation );

router.route( "/message" ).post( protect, sendMessage );

router.route( "/" ).get( protect, getAllConversations );

router.route( "/messages/:conversationId" ).get( protect, getAllMessages );

module.exports = router;
