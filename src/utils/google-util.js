const { google } = require('googleapis');
const { GoogleClientID, GoogleClientSecret } = require('../environment');

const googleConfig = {
  clientId: GoogleClientID,
  clientSecret: GoogleClientSecret,
  redirect: 'http://localhost:3000/api/v1/google-auth',
};

const defaultScope = [
  'https://www.googleapis.com/auth/plus.me',
  'https://www.googleapis.com/auth/userinfo.email',
];

const createConnection = () => new google.auth.OAuth2(
  googleConfig.clientId,
  googleConfig.clientSecret,
  googleConfig.redirect,
);

const getConnectionUrl = (auth) => auth.generateAuthUrl({
  access_type: 'offline',
  prompt: 'consent',
  scope: defaultScope,
});

const urlGoogle = () => {
  const auth = createConnection();
  const url = getConnectionUrl(auth);
  return url;
};

const getGooglePlusApi = (auth) => google.plus({ version: 'v1', auth });

const getGoogleAccountFromCode = async (code) => {
  const auth = createConnection();
  const { tokens } = await auth.getToken(code);
  auth.setCredentials(tokens);
  const plus = getGooglePlusApi(auth);
  const me = await plus.people.get({ userId: 'me' });
  const { url } = me.data.image;
  const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
  return {
    email: userGoogleEmail,
    profilePhotoUrl: url,
    tokens,
  };
};

// eslint-disable-next-line consistent-return
const verifyGoogleToken = async (idToken) => {
  try {
    const client = createConnection();
    await client.verifyIdToken({
      idToken,
      audience: GoogleClientID,
    });
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

module.exports = { urlGoogle, getGoogleAccountFromCode, verifyGoogleToken };
