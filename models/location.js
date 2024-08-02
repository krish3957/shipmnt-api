const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
}, { timestamps: true })


module.exports = mongoose.models?.User || mongoose.model('User', userSchema)