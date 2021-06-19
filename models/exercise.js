const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String
    },
    duration: {
        type: Number
    },
    date: {
        type: Date
    },
    userId: {
        type: String
    }
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise