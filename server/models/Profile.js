const mongoose = require("mongoose");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other'],
  },
  address: {
    type: String,
    default: "",
  },
  telephone: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: null
  },
  photo: {
    type: String,
    default: "",
  },
  tagLine:{
    type:String,
    default:''
  },
  price:{
    type:mongoose.Schema.Types.Decimal128,
    default:0
  },
  isSitter:{
    type:Boolean,
    default:false
  }

});

module.exports = Profile = mongoose.model("Profile", profileSchema);
