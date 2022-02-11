const asyncHandler = require( "express-async-handler" );
const Conversation = require( "../models/conversation" );
const Message = require( "../models/message" );
const Profile = require( "../models/Profile" );

// @route Post /
// @desc create conversation
// @access Private
exports.createConversation = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const senderId = profile._id;
  const { recipientId, text } = req.body;
  if ( recipientId === "" || text === "" )
  {
    res.status( 400 );
    throw new Error( "Insufficient data" );
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
          conversation: conversation
        },
      } );
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
          conversation: conversation
        },
      } );
    }
  }
} );


// @route Post /message
// @desc send message
// @access Private
exports.sendMessage = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const senderId = profile._id;
  const { text, conversationId } = req.body;
  if ( conversationId === "" || text === "" )
  {
    res.status( 400 );
    throw new Error( "Insufficient data" );
  }
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
      conversation: conversation
    },
  } );
} );


// @route GET /
// @desc send message
// @access Private
exports.getAllConversations = asyncHandler( async ( req, res, next ) => {
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const senderId = profile._id;
  let conversation = await Conversation.find( { $or: [ { userId1: senderId }, { userId2: senderId } ] } );
  let newConversation = [];
  for ( let i = 0; i < conversation.length; i++ )
  {
    let profileInfo = "";
    if ( conversation[ i ].userid1 === senderId )
    {
      profileInfo = await Profile.find( { _id: conversation[ i ].userId1 } );
    }
    else
    {
      profileInfo = await Profile.find( { _id: conversation[ i ].userId2 } );
    }
    let messages = await Message.find( { conversationId: conversation[ i ]._id } );
    newConversation[ i ] = ( [ messages, profileInfo ] );
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
  const profile = await Profile.findOne( { userId: req.user.id } );
  if ( !profile )
  {
    res.status( 401 );
    throw new Error( "Not authorized" );
  }
  const conversationId = req.params.conversationId;
  if ( conversationId === "" )
  {
    res.status( 400 );
    throw new Error( "Insufficient data" );
  }
  let messages = await Message.find( { conversationId } );
  res.status( 200 ).json( {
    success: {
      message: messages
    },
  } );
} );

