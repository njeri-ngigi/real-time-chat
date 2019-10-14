const jwt = require('jsonwebtoken');
const { AppSecret } = require('../environment');
const { getGoogleAccountFromCode, verifyGoogleToken } = require('./google-util');

const createJwtToken = (data) => jwt.sign(data, AppSecret, { expiresIn: 604800 });

// eslint-disable-next-line consistent-return
const validateGoogleTokenAndReturnAppToken = async (code) => {
  try {
    let token;
    const { email, profilePhotoUrl, tokens } = await getGoogleAccountFromCode(code);
    const isTokenValid = await verifyGoogleToken(tokens.id_token);
    if (isTokenValid) token = createJwtToken({ email, profilePhotoUrl });
    return { email, token };
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

// eslint-disable-next-line consistent-return
const verifyJwtToken = (token) => {
  try {
    return jwt.verify(token, AppSecret);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

const decodeJwtToken = (token) => jwt.decode(token);

module.exports = {
  createJwtToken,
  verifyJwtToken,
  decodeJwtToken,
  createAppToken: validateGoogleTokenAndReturnAppToken,
};
