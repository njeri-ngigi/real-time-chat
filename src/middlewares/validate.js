const EmailValidator = require('email-validator');

const errorResponse = (res, message) => res.status(400).send({ message });

const validateMessage = (req, res, next) => {
  const { message = '', receiver } = req.body;
  if (!EmailValidator.validate(receiver)) {
    return errorResponse(res, 'enter a valid email address for the receiver field');
  }
  if (!message.trim()) {
    return errorResponse(res, 'ensure the message field has data');
  }
  return next();
};

module.exports = {
  validateMessage,
};
