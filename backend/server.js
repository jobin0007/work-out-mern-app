require('dotenv').config()


const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

//express app 

const app = express()



//global middleaware. here we want add 3 parameters 
//.because we want to move next middleware.thats why we are adding 3 parametrs 

// app.use((req,res,next)=>{
//     console.log(req.path,req.method)
//     next()
// })

app.use(express.json())

app.use('/api/workouts', workoutRoutes)

//routes
app.get('/', (req, res) => {

    res.json({ mssg: 'welcome to the app' })

})

//connect to db

mongoose.connect(process.env.MONG_URI)
    .then(() => {
        //listen for requests

        app.listen(process.env.PORT, () => {
            console.log(
                'connected to db & listening on port', process.env.PORT
            );
        })
    })
    .catch((error) => {
        console.log(error)
    })

