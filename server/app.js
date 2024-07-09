const express = require("express");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const jwt = require('jsonwebtoken')

//Connect MongoDb
require("./db/connection.js");

//Import Files
const Users = require("./models/Users.js");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

port = process.env.PORT || 8080;

app.get("/", (req, res) => {
  res.send("Hello");
});

//signup api
app.post("/api/register", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (fullName && email && password) {
      const isAlreadyExist = await Users.findOne({ email });
      console.log(isAlreadyExist);
      if (isAlreadyExist) {
        res.status(400).send("user already exist");
      } else {
        const newUser = new Users({ fullName: fullName, email: email });
        bcryptjs.hash(password, 10, (err, newHashedPassword) => {
          newUser.set({ password: newHashedPassword });
          // console.log(newUser)
          newUser.save();
          res.status(200).send("user has been registered");
          next();
        });
      }
    } else {
      req.status(404).status("please enter all fields");
    }
  } catch (error) {}
});

//signin api
app.post('/api/signin', async (req,res,next)=>{
    const { email, password } = req.body
    if(email && password){
        const user = await Users.findOne({ email })
        if(user){
            const validateUser = bcryptjs.compare(password, user.password)
            if(!validateUser){
                //send wrong email or password but for testing here it is written specifically which one is wrong
                res.status(400).send('wrong password')
            }else{
                const payload = {
                    userId: user._id,
                    email: user.email
                }
                const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || 'secret'
                
                jwt.sign(payload, JWT_SECRET_KEY, {expiresIn: 84600}, async (err,token)=>{
                    await Users.updateOne({ _id: user._id }, {
                        $set: { token }
                    })
                    user.save()
                    next()
                })
                res.status(200).json({user : {fullName: user.fullName, email: user.email}, token: user.token})
            }
        }else{
            //send wrong email or password but for testing here it is written specifically which one is wrong
            res.status(400).send('wrong email')
        }
    }else{
        res.status(404).send('please enter all fields')
    }
})

app.listen(port, () => {
  console.log("server is running on port " + port);
});