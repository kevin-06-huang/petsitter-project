import mongoose from 'mongoose';

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    senderId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    conversationId: {
        type: Types.ObjectId,
        ref: 'Conversation',
        required: true
    },

},
    {
        timestamps: true
    });

const Message=mongoose.model('Message',messageSchema);

module.exports=Message;