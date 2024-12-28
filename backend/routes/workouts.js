const express = require('express')
const workouts = require('../models/workoutModels')
const {
createWorkout,
getWorkout,
getworkouts,
deleteWorkout,
updateWorkout

} = require('../controllers/workoutController')
const router = express.Router()


//get all workouts
router.get('/', getworkouts)


//get a single workout

router.get('/:id',getWorkout)

//post a new workout
router.post('/', createWorkout)

//delete a new workout
router.delete('/:id',deleteWorkout)


//update a new workout

router.patch('/:id',updateWorkout)



module.exports = router