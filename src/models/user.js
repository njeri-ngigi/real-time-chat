const mongoose = require('mongoose');
const EmailValidator = require('email-validator');
const contactSchema = require('./schemas/contact');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => EmailValidator.validate(value),
  },
  contacts: [contactSchema],
});

const UserModel = mongoose.model('User', userSchema);

module.exports = { UserModel };
