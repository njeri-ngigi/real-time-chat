const mongoose = require('mongoose');
const EmailValidator = require('email-validator');
const messageSchema = require('./message');

const contactsSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => EmailValidator.validate(value),
  },
  messages: [messageSchema],
});

module.exports = contactsSchema;
