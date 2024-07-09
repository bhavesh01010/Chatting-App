const mongoose = require('mongoose')

const messageSchema = mongoose.Schema({
    conversationId: {
        type: String,
    },
    senderId: {
        type: String,
    },
    messages: {
        type: String,
    },
});

const Messages = mongoose.model('Message', messageSchema)

module.exports = Messages