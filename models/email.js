const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema({
    from: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    sheduleDay: {
        type: Date,
    },
    sheduleDate: {
        type: Number,
    },
    scheduleTime: {
        type: String,
        required: true
    },
    scheduleType: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly', 'quarterly']
    },
    attachment: {
        type: String,
        required: false
    }
}, { timestamps: true })


module.exports = mongoose.models?.User || mongoose.model('User', userSchema)