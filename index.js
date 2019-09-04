const express = require('express')
const app = express()
const path = require('path')
const nodemailer = require('nodemailer')
const key = require('./key')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
let transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: key.USER,
        pass: key.PASS
    }
}

let transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});



app.get('/', (req, res) => {
    res.status(200).sendFile(__dirname + '/public/index.html')
})

app.post('/contact', (req, res) => {
    const {
        email,
        firstname,
        lastname,
        message,
        subject
    } = req.body
    let content = ` name: ${firstname} ${lastname} \n email: ${email} \n message: ${message} `
    console.log(req.body)
    let mail = {
        from: email,
        to: 'maykitchen.service@gmail.com',
        subject,
        text: content
    }
    transporter.sendMail(mail, (err, data) => {
        if (err) {
            res.status(404).json({
                msg:'fail to send'
            })
        } else {
            res.status(200).json({
                msg: 'success'
            })
        }
    })
})


app.listen(3000, (req, res) => {
    console.log('App running on 3000')
})