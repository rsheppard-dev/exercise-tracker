const mongoose = require('mongoose')

const userSchema = new moongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    }
})

userSchema.virtual('exercises', {
    ref: 'User',
    localField: '_id',
    foreignField: 'owner'
})

const User = moongoose.model('User', userSchema)

module.exports = User