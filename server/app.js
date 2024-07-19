const express = require("express");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const io = require('socket.io')(8000, {
  cors: {
    origin: "http://localhost:3000"
  }
})

//Connect MongoDb
require("./db/connection.js");

//Import Files
const Users = require("./models/Users.js");
const Conversations = require("./models/Conversations.js");
const Messages = require("./models/Messages.js");

const app = express();

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

port = process.env.PORT || 8080;

//Socket.io
let users =[]
io.on('connection', socket => {
  console.log('User connected: ', socket.id)
  socket.on('addUser', userId => {
    // const isUserExist = users.find(user => user.userId === userId)
    // if(!isUserExist){
      const user = {userId, socketId: socket.id}
      users.push(user)
      io.emit('getUsers', users)
      console.log(users)
    // }
  })
  socket.on('sendMessage', async({ senderId, receiverId, message, conversationId }) =>{
    console.log(await users)
    // console.log('receiver',receiverId)
    const receiver = await users.find(user => user.userId === receiverId)
    const sender = await users.find(user => user.userId === senderId)
    // console.log(receiver)
    const user = await Users.findById(senderId)
    // if(receiver){
      // console.log(sender.socketId, receiver.socketId)
      io.to(receiver.socketId).to(sender.socketId).emit('getMessage', {
        
        senderId,
        message,
        conversationId,
        receiverId,
        user: { id: user._id, fullName: user.fullName, email: user.email }
      })
      // console.log(receiver)
    // }
    socket.on('disconnect', ()=> {
      users = users.filter(user => user.socketId !== socket.id)
      console.log('a user has been disconnected')
      // io.emit('getUsers', users)
      console.log(users)
    })
  })
})

app.get("/", (req, res) => {
  res.send("Hello");
});

//signup api
app.post("/api/register", async (req, res, next) => {
  try {
    const { fullName, email, password } = req.body;
    if (fullName && email && password) {
      const isAlreadyExist = await Users.findOne({ email });
      if (isAlreadyExist) {
        res.status(400).json({ error: "user already exist" });
      } else {
        const newUser = new Users({ fullName: fullName, email: email });
        bcryptjs.hash(password, 10, (err, newHashedPassword) => {
          newUser.set({ password: newHashedPassword });
          newUser.save();
          res.status(200).json({ success: "user has been registered" });
          next();
        });
      }
    } else {
      res.status(404).json({ error: "please enter all fields" });
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

//signin api
app.post("/api/signin", async (req, res, next) => {
  const { email, password } = req.body;
  if (email && password) {
    const user = await Users.findOne({ email });
    if (user) {
      const validateUser = await bcryptjs.compare(password, user.password);
      if (!validateUser) {
        //send wrong email or password but for testing here it is written specifically which one is wrong
        res.status(400).json({ error: "wrong password" });
      } else {
        const payload = {
          userId: user._id,
          email: user.email,
        };
        const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY || "secret";
        
        const token = jwt.sign(
          payload,
          JWT_SECRET_KEY,
          { expiresIn: 84600 }
        );
        await Users.updateOne(
          { _id: user._id },
          {
            $set: { token },
          }
        );
        res.status(200).json({
          user: { fullName: user.fullName, email: user.email, id: user._id },
          token: token,
        });
      }
    } else {
      //send wrong email or password but for testing here it is written specifically which one is wrong
      res.status(400).json({ error: "wrong email" });
    }
  } else {
    res.status(404).json({ error: "please enter all fields" });
  }
});

//conersation creation api
app.post("/api/conversation", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;
    const newConversation = new Conversations({
      members: [senderId, receiverId],
    });
    await newConversation.save();
    res.status(200).json({ success: "conversation has been established" });
  } catch (error) {
    console.log("Error: ", error);
  }
});

//opening a conversation api
app.get("/api/conversation/:userId", async (req, res) => {
  try {
    const userId = req.params.userId;
    const conversationMembers = await Conversations.find({
      members: { $in: [userId] },
    });
    const userConversationData = Promise.all(
      conversationMembers.map(async (user) => {
        const receiverId = await user.members.find(
          (member) => member !== userId
        );
        const receiver = await Users.findById(receiverId);
        // console.log(receiver)
        return {
          user: { receiverId: receiver._id, fullName: receiver.fullName, email: receiver.email },
          conversationId: user._id,
        };
      })
    );
    res.status(200).json(await userConversationData);
  } catch (error) {
    console.log("Error: ", error);
  }
});

//saving messages to Db if conversation not created, will create conversation and then save message
app.post("/api/message", async (req, res) => {
  try {
    const { conversationId, senderId, receiverId='', message } = req.body;
    if (!senderId || !message || !receiverId) {
    } else if (conversationId === 'new') {
      console.log('conversation is new')
      const newConversation = await new Conversations({
        members: [senderId, receiverId]
      });
      await newConversation.save();
      // console.log(newConversation._id)
      const newMessage = await new Messages({
        conversationId: newConversation._id,
        senderId,
        message
      });
      await newMessage.save();
      res.status(200).json({ success: "conversation created and message saved" });
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).json({ success: "Message has been saved" });
  } catch (error) {
    console.log("Error: ", error);
  }
});

//viewing messages from database. If no conversation has been created it will use params as 'new' and send empty array
app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const checkMessages = async(conversationId) =>{
      const messages = await Messages.find({ conversationId });
      const userConversationData = Promise.all(
        messages.map(async (message) => {
          const sender = await Users.findById(message.senderId);
          return {
            user: { id:sender._id, fullName: sender.fullName, email: sender.email },
            message: message.message
          };
        })
      );
      res.status(200).json(await userConversationData);
    }
    const conversationId = req.params.conversationId;
    if (conversationId === "new") {
      const checkConversation = await Conversations.find({members: { $in : [req.query.receiverId, req.query.senderId]}})
      if(checkConversation.length>0){
        checkMessages(checkConversation[0]._id)
      }else{
        res.status(200).json([]);
      }
    }else{
      checkMessages(conversationId)
    }
  } catch (error) {
    console.log("Error: ", error);
  }
});

//list of all users
app.get("/api/users/:userId", async (req, res) => {
  try {
    const userId = req.params.userId
    const users = await Users.find({_id: {$ne: userId}});
    const userData = Promise.all(
      users.map((user) => {
        return {
          user: { id:user._id, fullName: user.fullName, email: user.email }
        };
      })
    );
    res.status(200).json(await userData);
  } catch (error) {
    console.log("Error: ", error);
  }
});

app.listen(port, () => {
  console.log("server is running on port " + port);
});
