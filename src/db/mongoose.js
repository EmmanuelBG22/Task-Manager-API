const mongoose =require('mongoose')

mongoose.connect(process.env.MONGODB_URL)




// const two = new Task({
//     description: 'Jess Glyne                   ',
//     completed: true
// })

// two.save().then((two)=>{
//     console.log(two)
// }).catch((error)=>{
//     console.log('Error', error)
// })