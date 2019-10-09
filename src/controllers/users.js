const { urlGoogle, getGoogleAccountFromCode } = require('../utils/google-util');

const redirect = (req, res) => {
  res.send({ message: urlGoogle() });
};

const loginOrSignup = async (req, res) => {
  const { code } = req.query;
  const { email, tokens: { id_token: token } } = await getGoogleAccountFromCode(code);

  res.send({
    message: 'welcome to real time chat',
    data: { token },
  });
};

module.exports = {
  loginOrSignup, redirect,
};
