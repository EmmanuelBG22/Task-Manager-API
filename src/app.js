const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const menuRouter = require('./routers/admin')
const path = require('path')


const app=express()

const publicDirectory = path.join(__dirname, '../')

app.use(express.static(publicDirectory))
app.use(express.urlencoded({extended: false}))


app.use(express.json())

app.set('view engine', 'hbs')

app.use(userRouter)
app.use(taskRouter)
app.use(menuRouter)


module.exports = app



