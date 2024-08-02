const { Schema } = require("mongoose");
const mongoose = require("mongoose");
const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, { timestamps: true })


module.exports = mongoose.models?.User || mongoose.model('User', userSchema)