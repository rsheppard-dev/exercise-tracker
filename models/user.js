const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
        trim: true,
        minlength: [4, 'Username must be at least 4 characters long!'],
        maxlength: [16, 'Username cannot be more than 16 characters long!']
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