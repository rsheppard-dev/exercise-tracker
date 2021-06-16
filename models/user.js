const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true
    }
})

userSchema.virtual('exercises', {
    ref: 'Exercise',
    localField: '_id',
    foreignField: 'owner'
})

// custom error message if username already exists
userSchema.post('save', function (error, doc, next) {
    if (error.name === 'MongoError' && error.code === 11000) {
        next(new Error('Username already exists!'))
    } else {
        next(error)
    }
})

// hide version from being sent back to client
userSchema.methods.toJSON = function () {
    const user = this
    const userObject = user.toObject()

    delete userObject.__v

    return userObject
}

const User = mongoose.model('User', userSchema)

module.exports = User