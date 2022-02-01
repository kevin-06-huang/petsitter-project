const mongoose = require("mongoose");


const dayInformationSchema = {
    isAvaliable: {
        type: Boolean,
        default: 'true'
    },
    startTime: {
        type: Number,
        min: 0,
        max: 24,
        required: this.isAvaliable
    },
    endTime: {
        type: Number,
        min: 0,
        max: 24,
        required:  this.isAvaliable,
        validate: [timeValidator, 'Start time must be less than End time']
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
        required: 'true'
    },
    days: {
        sunday: dayInformationSchema,
        monday: dayInformationSchema,
        tuesday: dayInformationSchema,
        wednesday: dayInformationSchema,
        thursday: dayInformationSchema,
        friday: dayInformationSchema,
        saturday: dayInformationSchema
    },

});
function timeValidator(startTime,endTime) {
    return startTime < endTime;
};
module.exports = Availability = mongoose.model("Availability", availabilitySchema);
