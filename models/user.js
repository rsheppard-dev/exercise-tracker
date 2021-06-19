const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    }
})

userSchema.virtual('exercises', {
    ref: 'Exercise',
    localField: '_id',
    foreignField: 'owner'
})

const User = mongoose.model('User', userSchema)

module.exports = User