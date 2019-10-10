const mongoose = require('mongoose');
const EmailValidator = require('email-validator');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: (value) => EmailValidator.validate(value),
    createdAt: Date,
    updatedAt: Date,
  },
});

userSchema.pre('save', (next) => {
  const now = Date.now();
  this.updatedAt = now;
  if (!this.createdAt) this.createdAt = now;
  next();
});

module.exports = mongoose.model('User', userSchema);
