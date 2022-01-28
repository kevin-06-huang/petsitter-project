const mongoose = require("mongoose");


const dayInformation={
    isAvaliable:{
        type:Boolean,
        default:'true'
    },
    startDate:{
        type:Number,
        min:0,
        max:24,
        required:isAvaliableForDay
    },
    endDate:{
        type:Number,
        min:0,
        max:24,
        required:isAvaliableForDay,
        validate: [dateValidator, 'Start Date must be less than End Date']
    }
}
function isAvaliableForDay(){
    if(this.isAvaliable > -1){  
        return true;
    }
    return false;
}

const availabilitySchema = new mongoose.Schema({
  petSitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },
  days: {
  sunday:dayInformation,
  monday:dayInformation,
  tuesday:dayInformation,
  wednesday:dayInformation,
  thursday:dayInformation,
  friday:dayInformation,
  saturday:dayInformation
  },
  
});
function dateValidator(value) {
    return this.startDate <= value;
};
module.exports = Availability = mongoose.model("Availability", availabilitySchema);
