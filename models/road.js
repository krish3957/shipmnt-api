const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema({
    start_location_id: {
        type: String,
        required: true
    },
    end_location_id: {
        type: String,
        required: true
    },
    distance: {
        type: String,
        required: true
    },
    traffic_condition: {
        type: Number,
        enum: [1, 5, 10]
    },
}, { timestamps: true })


module.exports = mongoose.models?.User || mongoose.model('User', userSchema)