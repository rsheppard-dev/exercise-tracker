const express = require('express')
const moment = require('moment')
const Exercise = require('../models/exercise')
const fetchUserData = require('../middleware/fetchUserData')

const router = express.Router()

// log a new exercise for user
router.post('/api/users/:id/exercises', fetchUserData, async (req, res) => {
    const user = req.user
    const exercise = new Exercise({
        description: req.body.description,
        duration: req.body.duration,
        date: req.body.date ? req.body.date : undefined,
        owner: req.body[':_id']
    })
    
    try {
        await exercise.save()

        res.json({
            _id: user._id,
            username: user.username,
            description: exercise.description,
            duration: exercise.duration,
            date: exercise.date
        })
    } catch (error) {
        res.json(error)
    }
})

module.exports = router