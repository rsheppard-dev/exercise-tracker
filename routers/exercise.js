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
        date: !req.body.date ? Date.now() : new Date(req.body.date),
        userId: user._id
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
    const from = req.query.from && new Date(req.query.from)
    const to = req.query.to && new Date(req.query.to)
    const limit = req.query.limit && parseInt(req.query.limit)
    const find = { userId: user._id }
    const filterData = { _id: user._id, username: user.username }

    if (from && to) {
        find.date = {
            $gte: from,
            $lte: to
        }

        filterData.from = from.toDateString()
        filterData.to = to.toDateString()
    }

    try {
        const exerciseLog = await Exercise
            .find(find, 'description duration date')
            .limit(limit)        
        
        res.json({
            ...filterData,
            count: exerciseLog.length,
            log: exerciseLog.map(exercise => {
                return {
                    description: exercise.description,
                    duration: exercise.duration,
                    date: exercise.date.toDateString()
                }
            })
        })
    } catch (error) {
        res.json(error)
    }
})

module.exports = router