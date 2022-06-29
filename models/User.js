const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false,
        max: 255
    },
    email: {
        type: String,
        require: true,
        max: 255
    },
    password:{
        type: String,
        required: true,
        max: 1024,
        min: 6
    },
    date: {
        type: Date,
        default: Date.now
    },
    roles: {
        type: Array,
        default: [1022]
    }
});

module.exports = mongoose.model('User', userSchema);