const { urlGoogle, getGoogleAccountFromCode } = require('../utils/google-util');
const { createUser } = require('../services/user');

const redirect = (req, res) => {
  res.send({ message: urlGoogle() });
};

const loginOrSignup = async (req, res) => {
  const { code } = req.query;
  const { email, tokens } = await getGoogleAccountFromCode(code);
  const { id_token: token } = tokens;
  const userInserted = await createUser(email);

  if (!userInserted) return res.status(500).send({ message: 'Something went wrong. Try again.' });

  return res.send({
    message: 'welcome to real time chat',
    data: { email, token },
  });
};

module.exports = {
  loginOrSignup, redirect,
};
