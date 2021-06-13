const User = require('../models/user')

const fetchUserData = async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.body[':_id'] })

        if (!user) throw new Error('No such user exists!')

        req.user = user
        next()
    } catch (error) {
        res.json(error)
    }
}

module.exports = fetchUserData