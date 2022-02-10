

const User = require( "../models/User" );
const asyncHandler = require( "express-async-handler" );
const Conversation = require( "../models/conversation" );
const Message = require( "../models/message" );
const Profile = require( "../models/Profile" );

// @route Post /create
// @desc create conversation
// @access Public
exports.createConversation = asyncHandler( async ( req, res, next ) => {
  const userId = await User.findById( req.user.id );
  if ( !userId )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const senderId = req.user.id;
  const { recipientId, text, conversationId } = req.body;
  if ( conversationId )
  {
    const message = await Message.create( { senderId, text, conversationId } );
    return res.json( { message } );
  }

  let conversation = await Conversation.findOne( { $and: [ { userId1: senderId }, { userId2: recipientId } ] } );
  if ( conversation )
  {
    const message = await Message.create( {
      senderId,
      text,
      conversationId: conversation._id
    } )
    if ( message )
    {
      res.status( 200 ).json( {
        success: {
          message: message,
          conversation: conversation._id
        },
      } );
    }
    else
    {
      res.status( 500 );
      throw new Error( "Invalid data" )
    }
  }
  else
  {
    conversation = await Conversation.create( {
      userId1: senderId, userId2: recipientId
    } )
    const newMessage = await Message.create( {
      senderId,
      text,
      conversationId: conversation._id
    } )
    if ( newMessage )
    {
      res.status( 200 ).json( {
        success: {
          message: newMessage,
          conversation: conversation._id
        },
      } );
    }
    else
    {
      res.status( 500 );
      throw new Error( "Invalid data" )
    }
  }
} );


// @route Post /send
// @desc send message
// @access Public
exports.sendMessage = asyncHandler( async ( req, res, next ) => {
  const userId = await User.findById( req.user.id );
  if ( !userId )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const senderId = req.user.id;
  const { text, conversationId } = req.body;

  let conversation = await Conversation.findOne( { _id: conversationId } );
  if ( !conversation )
  {
    res.status( 404 );
    throw new Error( "No conversation found" );
  }
  const message = await Message.create( {
    senderId,
    text,
    conversationId
  } )
  res.status( 200 ).json( {
    success: {
      message: message,
      conversation: conversation._id
    },
  } );
} );


// @route GET /all
// @desc send message
// @access Public
exports.getAllConversations = asyncHandler( async ( req, res, next ) => {
  const userId = await User.findById( req.user.id );
  if ( !userId )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const senderId = req.user.id;
  let conversation = await Conversation.find( { $or: [ { userId1: senderId }, { userId2: senderId } ] } );
  if ( !conversation )
  {
    res.status( 404 );
    throw new Error( "No conversation found" );
  }
  let newConversation = [];
  for ( let i = 0; i < conversation.length; i++ )
  {
    let profile = "";
    if ( conversation[ i ].userid1 === senderId )
    {
      profile = await Profile.find( { userId: conversation[ i ].userId1 } );
    }
    else
    {
      profile = await Profile.find( { userId: conversation[ i ].userId2 } );
    }
    let messages = await Message.find( { conversationId: conversation[ i ]._id } );
    newConversation[ i ] = ( [ messages, profile ] );
  }
  res.status( 200 ).json( {
    success: {
      newConversation: newConversation
    },
  } );
} );

// @route GET /message/:conversationId
// @desc get all messages
// @access Public
exports.getAllMessages = asyncHandler( async ( req, res, next ) => {
  const conversationId = req.params.conversationId;
  let messages = await Message.find( { conversationId } );
  if ( !messages )
  {
    res.status( 404 );
    throw new Error( "No conversation found" );
  }
  res.status( 200 ).json( {
    success: {
      message: messages
    },
  } );
} );

