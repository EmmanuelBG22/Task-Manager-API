const { request } = require('express')
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app=express()

const port =process.env.PORT

// app.use((req, res, next)=> {
//     res.status(503).send('site in maintannace mode')
// })



app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


//without middleware: new request ==> run route handler

//with middleware: new request -> do something -> run route handler


app.listen(port, ()=>{
    console.log('server is up and running on ' + port)
})
















//showing how populate works, this is different from the video becasue the version that andrew used has been outdated

// const main = async () => {
//     // const task = await Task.findById('6222673908d2ad2c3d604176')
//     // await task.populate('owner')
//     // console.log(task.owner)

//     const user = await User.findById('622263ec8ddf84c55b248a5f')
//     await user.populate('tasks')
//     console.log(user.tasks)
// }



// main()


//How to hash a password

// const myFunc = async () => {
//     const token = jwt.sign({_id: 'abc123'}, 'thisismyname', { expiresIn: '30000 seconds'})
//     console.log(token)

//     setTimeout(()=>{const data = jwt.verify(token, 'thisismyname')
//     console.log(data)}, 4000)
// }


// myFunc()


//Stringify data to show how .toJSON works and why it gives us direct access to the data in postman

// const pet = {
//     name: 'Hal'
// }

// pet.toJSON = function(){
//     console.log(this)
//     return this
// }

// console.log(JSON.stringify(pet))