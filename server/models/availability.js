const mongoose = require("mongoose");


const dayInformation={
    active:{
        type:Boolean,
        default:'true'
    },
    startTime:{
        type:String,
        required:this.active
    },
    endTime:{
        type:String,
        required:this.active,
    }
}

const availabilitySchema = new mongoose.Schema({
  petSitterId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Profile'
  },  
  name: {
    type:'string',
    required:true
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
availabilitySchema.pre('validate', function(next) {
    var startHour = this.startTime.split(":")[0];
    var endHour=this.endTime.split(":")[0];
    if (startHour > endHour) {
        next(new Error('End time must be greater than Start time'));
    } else {
        next();
    }
});
module.exports = Availability = mongoose.model("Availability", availabilitySchema);
