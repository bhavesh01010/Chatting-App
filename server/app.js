const express = require('express')
require('dotenv').config()

//Connect MongoDb
require('./db/connection.js')

//Import Files
const Users = require('./models/Users.js')

const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended: false}))

port = process.env.PORT || 8080

app.get('/', (req,res)=>{
    res.send('Hello')
})
app.listen(port , ()=>{
    console.log('server is running on port '+ port )
})