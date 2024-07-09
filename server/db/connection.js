const mongoose = require('mongoose')
require('dotenv').config()

mongoose.connect(process.env.MongoURL).then(()=> console.log("connected to database")).catch((e)=>console.log('error: ', e))