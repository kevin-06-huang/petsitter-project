const mongoose = require("mongoose");


const dayInformation = {
    active: {
        type: Boolean,
        default: 'true'
    },
    startTime: {
        type: String,
        required: this.active,
        validate:[startTimeValidator]
    },
    endTime: {
        type: String,
        required: this.active,
        validate:[endTimeValidator]
    }
}

const availabilitySchema = new mongoose.Schema({
    petSitterId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Profile'
    },
    name: {
        type: 'string',
        required: true
    },
    days: {
        sunday: dayInformation,
        monday: dayInformation,
        tuesday: dayInformation,
        wednesday: dayInformation,
        thursday: dayInformation,
        friday: dayInformation,
        saturday: dayInformation
    },

});
availabilitySchema.pre('validate', function (next) {
    var startHour = this.startTime.split(":")[0];
    var endHour = this.endTime.split(":")[0];
    if (startHour > endHour) {
        next(new Error('End time must be greater than Start time'));
    } else {
        next();
    }
});

function startTimeValidator(){
    var startHour = this.startTime.split(":")[0];
    var startMinute = this.startTime.split(":")[1];
    if(startHour>23 || startMinute>59) {
        next(new Error('Invalid Time'));
    } else {
        next();
    }

}
function endTimeValidator(){
    var endHour = this.endTime.split(":")[0];
    var endMinute = this.endTime.split(":")[1];
    if(endHour>23 || endMinute>59) {
        next(new Error('Invalid Time'));
    } else {
        next();
    }

}
module.exports = Availability = mongoose.model("Availability", availabilitySchema);