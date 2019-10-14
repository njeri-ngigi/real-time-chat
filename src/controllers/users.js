const { createAppToken } = require('../utils/jwt');
const { urlGoogle } = require('../utils/google-util');
const { createUser } = require('../services/user');

const redirect = (req, res) => {
  res.send({ message: urlGoogle() });
};

const loginOrSignup = async (req, res) => {
  const errorResponse = () => res.status(500).send({ message: 'Something went wrong. Try again.' });
  const { code } = req.query;
  const { email, token } = await createAppToken(code);

  if (!email || !token) return errorResponse();

  const userInserted = await createUser(email);

  if (!userInserted) return errorResponse();

  return res.send({
    message: 'welcome to real time chat',
    data: { email, token },
  });
};

module.exports = {
  loginOrSignup, redirect,
};
