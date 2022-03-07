const sgMail = require('@sendgrid/mail')



sgMail.setApiKey(process.env.SENDGRID_API_KEY)

// sgMail.send({
//     to:'emmanuel.olajumoke@babbangona.com',
//     from: 'emmanuel.olajumoke@babbangona.com',
//     subject: 'Thsi is my first email',
//     text: 'I hope thsi actually gets to you'
// })

const sendWelcomeEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'emmanuel.olajumoke@babbangona.com',
        subject: 'Thanks for joining in!',
        text: `welcoem to the app, ${name} let me knwo how you enjoy the app`
    })
}


const sendDeleteEmail = (email, name)=>{
    sgMail.send({
        to: email,
        from: 'emmanuel.olajumoke@babbangona.com',
        subject: 'We are sad to see you go!',
        text: `Hi ${name}, \n We see you closed your account with us. We support your every move, \n But we want a little feedback from you if there is anything we could have done better`
    })
}


module.exports = {
    sendWelcomeEmail,
    sendDeleteEmail
}