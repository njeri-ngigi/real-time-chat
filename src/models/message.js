const mongoose = require('mongoose');
const EmailValidator = require('email-validator');

const contactSchema = {
  type: String,
  required: true,
  validate: (value) => EmailValidator.validate(value),
};

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true,
  },
  sender: contactSchema,
  receiver: contactSchema,
  createdAt: { type: Date, default: Date.now },
});

const MessageModel = mongoose.model('Message', messageSchema);

module.exports = { MessageModel };
