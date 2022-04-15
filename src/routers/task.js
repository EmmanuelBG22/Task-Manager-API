const express = require('express')

const Task = require('../models/task')
const auth = require('../middleware/auth')
const User = require('../models/user')

const router = new express.Router()

router.post('/task', auth, async (req, res)=>{
    // const task = new Task(req.body)
    const task = new Task({
        ...req.body,
        owner: req.user._id,
        name: req.user.name
    })

    try{
        await task.save()
        res.status(201).send(task)
    }catch(e){
        res.status(400).send(e)
    }
})


//GET /tasks?completed=true
//GET /tasks?limit = 10& skip=20
router.get('/tasks/admin', async (req, res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        // const task = await Task.find({owner:req.user._id})
        
        //alternatively, instead of the above
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(Task)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks', auth, async (req, res)=>{
    const match = {}
    const sort = {}

    if(req.query.completed){
        match.completed = req.query.completed === 'true'
    }

    if(req.query.sortBy){
        const parts = req.query.sortBy.split(':')
        sort[parts[0]] = parts[1] === 'desc' ? -1 : 1
    }

    try{
        // const task = await Task.find({owner:req.user._id})
        
        //alternatively, instead of the above
        await req.user.populate({
            path: 'tasks',
            match,
            options: {
                limit: parseInt(req.query.limit),
                skip: parseInt(req.query.skip),
                sort
            }
        })
        res.send(req.user.tasks)
    }catch(e){
        res.status(500).send()
    }
})

router.get('/tasks/:id', auth, async (req, res)=>{
    const _id = req.params.id

    try{
        // const task = await Task.findById(_id)
        const task = await Task.findOne({_id, owner: req.user._id})


        if(!task){
            return res.status(404).send('not found')
         }
         res.send(task)
    }catch(e){
        res.status(500).send('error')
    }
})

router.get('/taskss', async(req, res)=>{
    const user = await Task.find((err, docs)=>{
        if(err){
            console.log(err);
        }else{
            for(var user in docs){
                console.log(user)
            }
        }
    })
})

router.get('/alltasks', async(req, res)=>{
    const task = await Task.find({})
    res.send(task)
})

router.patch('/tasks/:id', auth, async(req, res)=>{
    const updates = Object.keys(req.body)
    const isValidUpdates= ['description', 'completed']

    const validateUpdates = updates.every((update)=> isValidUpdates.includes(update))

    if(!validateUpdates){
        return res.status(400).send({error: 'Invalid Update!'})
    }


    try{
        const task = await Task.findOne({_id: req.params.id, owner: req.user._id})

        if(!task){
            return res.status(404).send()
        }
        updates.forEach((update)=> task[update] = req.body[update])
        await task.save()

        res.status(200).send(task)
    }catch(e){
        res.status(400).send()
    }

})

router.delete('/tasks/:id', auth, async(req, res)=>{
    try{
        const task = await Task.findOneAndDelete({_id: req.params.id, owner:req.user._id})
        if(!task){
        res.status(404).send('User not Found')
        }
       
        res.send(task)
    }catch(e){
        res.status(500).send()
    }
})


module.exports = router