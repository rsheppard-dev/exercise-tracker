const express = require('express')
const User = require('../models/user')

const router = express.Router()

// create new user
router.post('/api/users', async (req, res) => {
    const user = new User(req.body)

    try {
        const { _id, username } = await user.save()
        
        res.json({
            _id,
            username
        })
    } catch (error) {
        if (error.name === 'MongoError' && error.code === 11000)
            return res.send('Username is already taken!')
            
        res.json(error)
    }
})

// get list of all users
router.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({}, null, {
            sort: { username: 1 }
        })

        res.json(users)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router