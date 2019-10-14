const EmailValidator = require('email-validator');
const Users = require('../services/user');

const errorResponse = (res, message, status = 400) => res.status(status).send({ message });

const validateContact = async (req, res, next) => {
  const { receiver } = req.body;
  if (!EmailValidator.validate(receiver)) {
    return errorResponse(res, 'enter a valid email address for the receiver field');
  }
  const foundReceiver = await Users.findUser(receiver);
  if (!foundReceiver) {
    return errorResponse(res, 'receiver not found', 404);
  }
  return next();
};

const validateMessage = (req, res, next) => {
  const { message = '' } = req.body;
  if (!message.trim()) {
    return errorResponse(res, 'ensure the message field has data');
  }
  return next();
};

module.exports = {
  validateContact, validateMessage,
};
