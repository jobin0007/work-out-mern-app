const workouts = require('../models/workoutModels')

const mongoose = require('mongoose')


//create a workout

const createWorkout = async (req, res) => {

    const { title, load, reps } = req.body
    let emptyFields = []

    if (!title) {
        emptyFields.push('title')
    }
    if (!load) {
        emptyFields.push('load')
    }
    if (!reps) {
        emptyFields.push('reps')
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'please fill    all the fields', emptyFields })
    }


    //add doc to db
    try {
        const workout = await workouts.create({ title, load, reps })
        res.status(200).json(workout)
    }
    catch (error) {
        res.status(400).json({ error: error.message })
    }


}




//get all workouts
const getworkouts = async (req, res) => {
    const workout = await workouts.find({}).sort({ createdAt: -1 })
    res.status(200).json(workout)
}


//get a sigle wrkouts

const getWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {

        return res.status(404).json({ error: 'No such workout' })

    }

    const workout = await workouts.findById(id)
    //if we did not get the workout back
    if (!workout) {
        return res.status(404).json({ error: 'No such woorkout' })
    }
    res.status(200).json(workout)
}

//delete workout

const deleteWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.satatus.json({ error: 'No such  Workout' })
    }

    const workout = await workouts.findOneAndDelete({ _id: id })

    if (!workout) {
        return res.status(400).json({ error: 'No such workout' })
    }
    res.status(200).json(workout)
}


const updateWorkout = async (req, res) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.satatus.json({ error: 'No such  Workout' })
    }
    const workout = await workouts.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    if (!workouts) {
        res.status(400).json({ erorr: 'No such workout' })
    }
    res.status(200).json(workout)
}
module.exports = {
    createWorkout,
    getWorkout,
    getworkouts,
    deleteWorkout,
    updateWorkout

}
