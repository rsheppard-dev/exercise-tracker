const express = require('express')
const User = require('../models/user')

const router = express.Router()

// create new user
router.post('/api/users', async (req, res) => {
    User.init()
        .then(async () => {
            const user = new User(req.body)
            const result = await user.save()
            res.json(result)
        })
        .catch(error => {
            res.json(error.message)
        })
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