const mongoose = require( 'mongoose' );

const messageSchema = new mongoose.Schema( {
    text: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'Profile',
        required: true
    },
    conversationId: {
        type: mongoose.Types.ObjectId,
        ref: 'Conversation',
        required: true
    },
    read: {
        type: Boolean,
        required: true
    }

},
    {
        timestamps: true
    } );

module.exports = Message = mongoose.model( 'Message', messageSchema );
