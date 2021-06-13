const mongoose = require('mongoose')

const exerciseSchema = new mongoose.Schema({
    description: {
        type: String,
        trim: true,
        required: true
    },
    duration: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

// hide version, exercise id and user id from being sent back to client
exerciseSchema.methods.toJSON = function () {
    const exercise = this
    const exerciseObject = exercise.toObject()

    delete exerciseObject._id
    delete exerciseObject.__v
    delete exerciseObject.owner

    return exerciseObject
}

const Exercise = mongoose.model('Exercise', exerciseSchema)

module.exports = Exercise