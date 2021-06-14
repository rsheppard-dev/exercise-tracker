const User = require('../models/user')

const fetchUserData = async (req, res, next) => {
    const _id = req.body[':_id'] ?
        req.body[':_id'] :
        req.params._id

    try {
        const user = await User.findById(_id)
        
        if (!user) throw new Error()

        req.user = user

        next()
    } catch (error) {
        res.json({error: 'No such user exists!'})
    }
}

module.exports = fetchUserData