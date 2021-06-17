const express = require('express')
const Exercise = require('../models/exercise')
const fetchUserData = require('../middleware/fetchUserData')

const router = express.Router()

// log a new exercise for user
router.post('/api/users/:_id/exercises', fetchUserData, async (req, res) => {
    const user = req.user
    const exercise = new Exercise({
        description: req.body.description,
        duration: parseInt(req.body.duration),
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
            date: exercise.date.toDateString()
        })
    } catch (error) {
        res.json(error)
    }
})

// get a log of users exercises
router.get('/api/users/:_id/logs', fetchUserData, async (req, res) => {
    const user = req.user
    const find = {}
    const start = req.query.from && new Date(req.query.from)
    const end = req.query.to && new Date(req.query.to)
    
    if (start && end) find.date = {
        '$gte': start,
        '$lte': end
    }
    
    try {
        await user.populate({
            path: 'exercises',
            options: {
                limit: parseInt(req.query.limit),
                find,
                sort: { date: -1 }
            }
        }).execPopulate()

        const exerciseLog = user.exercises.map(exercise => {
            return {
                description: exercise.description,
                duration: exercise.duration,
                date: exercise.date.toDateString()
            }
        })        
        
        res.json({
            _id: user._id,
            username: user.username,
            count: user.exercises.length,
            log: exerciseLog
        })
    } catch (error) {
        res.json(error)
    }
})

module.exports = router