const express = require("express");
require("dotenv").config();
const bcryptjs = require("bcryptjs");
const cors = require("cors");
const jwt = require("jsonwebtoken");

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
        res.status(400).json({ error: "user already exist" });
      } else {
        const newUser = new Users({ fullName: fullName, email: email });
        bcryptjs.hash(password, 10, (err, newHashedPassword) => {
          newUser.set({ password: newHashedPassword });
          newUser.save();
          res.status(200).send("user has been registered");
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
          user: { fullName: user.fullName, email: user.email },
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
    res.status(200).json({ error: "conversation has been established" });
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
        return {
          user: { fullName: receiver.fullName, email: receiver.email },
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
    const { conversationId, senderId, receiverId, message } = req.body;
    if (!senderId || !message || !receiverId) {
      res.status(404).json({ error: "provide senderId and message" });
    } else if (!conversationId) {
      const newConversation = new Conversations({
        members: [senderId, receiverId],
      });
      await newConversation.save();
      const newMessage = await new Messages({
        conversationId,
        senderId,
        message,
      });
      await newMessage.save();
      res.status(200).json({ error: "conversation created and messaeg saved" });
    }
    const newMessage = new Messages({ conversationId, senderId, message });
    await newMessage.save();
    res.status(200).json({ error: "Message has been saved" });
  } catch (error) {
    console.log("Error: ", error);
  }
});

//viewing messages from database. If no conversation has been created it will use params as 'new' and send empty array
app.get("/api/message/:conversationId", async (req, res) => {
  try {
    const conversationId = req.params.conversationId;
    if (conversationId === "new") {
      res.status(200).json([]);
    }
    const messages = await Messages.find({ conversationId });
    const userConversationData = Promise.all(
      messages.map(async (message) => {
        const sender = await Users.findById(message.senderId);
        return {
          user: { fullName: sender.fullName, email: sender.email },
          message: message.message,
        };
      })
    );
    res.status(200).json(await userConversationData);
  } catch (error) {
    console.log("Error: ", error);
  }
});

//list of all users
app.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    const userData = Promise.all(
      users.map((user) => {
        return {
          user: { fullName: user.fullName, email: user.email },
          userId: user._id,
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
