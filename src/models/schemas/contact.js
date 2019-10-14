const mongoose = require('mongoose');
const EmailValidator = require('email-validator');

const contactSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: (value) => EmailValidator.validate(value),
  },
});

module.exports = contactSchema;
