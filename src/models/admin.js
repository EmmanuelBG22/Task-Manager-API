const mongoose = require('mongoose')
const User = require('./user')

const menuSchema = new mongoose.Schema({
    restaurant:{
        type: String,
        trim: true,
        required: true
    },
    menu:{
        type: String,
        trim: true,
        required: true
    },
    price:{
        type: Number,
        default: 0,
    },
    name: {
        type: String,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
})


const Menu = mongoose.model('Menu', menuSchema)



module.exports = Menu