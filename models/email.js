const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const emailSchema = new Schema({
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
    scheduleDay: {
        type: Number,
    },
    scheduleDate: {
        type: Number,
    },
    scheduleTime: {
        type: Number,
        required: true
    },
    scheduleType: {
        type: String,
        required: true,
        enum: ['daily', 'weekly', 'monthly', 'quarterly']
    },
    attachment: {
        type: Array,
        required: false
    }
}, { timestamps: true })


module.exports = mongoose.models?.Email || mongoose.model('Email', emailSchema)