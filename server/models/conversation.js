const mongoose = require( 'mongoose' );

const conversationSchema = new mongoose.Schema( {
    userId1: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    userId2: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
}, {
    timestamps: true
} );

const Conversation = mongoose.model( 'Conversation', conversationSchema );

module.exports = Conversation;