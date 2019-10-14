const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sent: Boolean,
  received: Boolean,
  forwarded: Boolean,
});

module.exports = messageSchema;
