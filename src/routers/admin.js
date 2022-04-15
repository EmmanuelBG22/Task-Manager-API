const { application } = require('express')
const express = require('express')


const Menu = require('../models/admin')
const auth = require('../middleware/auth')
const authRole = require('../middleware/authRole')
const User = require('../models/user')

const router = new express.Router()

router.post('/menu', auth, authRole("Admin"), async (req, res)=>{
    const menu = new Menu({
        ...req.body,
        name: req.user.name
    })

    try{
        await menu.save()
        res.status(201).send(menu)
    }catch(e){
        res.status(400).send(e)
    }
})

router.patch('/menu/:id', auth, authRole("Admin"), async(req, res)=>{
    const updates = Object.keys(req.body)
    const isValidUpdates= ['restaurant', 'menu', 'price']

    

    const validateUpdates = updates.every((update)=> isValidUpdates.includes(update))

    if(!validateUpdates){
        return res.status(400).send({error: 'Invalid Update!'})
    }


    try{
        const menu = await Menu.findOne({_id: req.params.id, owner: req.user._id})

        if(!menu){
            return res.status(404).send()
        }
        updates.forEach((update)=> menu[update] = req.body[update])
        await menu.save()

        res.status(200).send(menu)
    }catch(e){
        res.status(400).send()
    }

})

router.get('/menu', auth, authRole("Admin"), async(req, res)=>{
    const menu = await Menu.find({})
    res.send(menu)
})

router.delete('/menu/:id', auth, async(req, res)=>{
    try{
        const menu = await Menu.findOneAndDelete({_id: req.params.id, owner:req.user._id})
        if(!menu){
        res.status(404).send('User not Found')
        }
       
        res.send(menu)
    }catch(e){
        res.status(500).send()
    }
})

router.get
module.exports = router