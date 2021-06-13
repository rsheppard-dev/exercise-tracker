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
        default: new.Date
    }
})

// convert user entered dates before storing
exerciseSchema.pre('save', async function (next) {
    const exercise = this

    exercise.date = await new Date(exercise.date)

    next()
})

const Exercise = mongoose.model('Exercise', exerciseSchema)

mondule.exports = Exercise