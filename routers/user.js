const express = require('express')
const User = require('../models/user')
const fetchUserData = require('../middleware/fetchUserData')

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

// get a log of users exercises
router.get('/api/users/:id/logs', fetchUserData, async (req, res) => {
    const user = req.user

    try {
        console.log(user)
    } catch (error) {
        res.json(error)
    }
})

module.exports = router