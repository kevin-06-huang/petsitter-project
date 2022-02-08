const mongoose=require('mongoose');

const conversationSchema=new mongoose.Schema({
    userId1:{
        type:mongoose.Types.ObjectId;
        ref:'User',
        required:true
    },
    userId2:{
        type:mongoose.Types.ObjectId;
        ref:'User',
        required:true
    },
});

const Conversation=mongoose.model('Conversation',conversationSchema);

module.exports=Conversation;