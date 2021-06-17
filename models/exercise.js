const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise