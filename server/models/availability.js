const mongoose = require("mongoose");


const dayInformationSchema = {
    active: {
        type: Boolean,
        default: 'true'
    },
    startTime: {
        type: String,
        required: this.active,
        default: '00:00',
        validate: [startTimeValidator]
    },
    endTime: {
        type: String,
        required: this.active,
        default: '00:00',
        validate: [endTimeValidator]
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
        sunday: dayInformationSchema,
        monday: dayInformationSchema,
        tuesday: dayInformationSchema,
        wednesday: dayInformationSchema,
        thursday: dayInformationSchema,
        friday: dayInformationSchema,
        saturday: dayInformationSchema
    },

});
availabilitySchema.pre('validate', function (next) {
    let startHour;
    let endHour;
    Object.entries(this.days).map(([key, value]) => {
        Object.entries(value).map(([key, value]) => {

            if (key == 'startTime') {
                startHour = value.split(":")[0];
            }
            if (key == 'endTime') {
                endHour = value.split(":")[0];
            }
            if (startHour > endHour) {
                next(new Error('End time must be greater than Start time'));
            } else {
                next();
            }
        })
    })
});

function startTimeValidator(value) {
    var startHour = value.split(":")[0];
    var startMinute = value.split(":")[1];
    if (startHour > 23 || startMinute > 59) {
        next(new Error('Invalid Time'));
    }

}
function endTimeValidator(value) {
    var endHour = value.split(":")[0];
    var endMinute = value.split(":")[1];
    if (endHour > 23 || endMinute > 59) {
        next(new Error('Invalid Time'));
    }

}
module.exports = Availability = mongoose.model("Availability", availabilitySchema);