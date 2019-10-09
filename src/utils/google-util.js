const { google } = require('googleapis');
const { GoogleClientID, GoogleClientSecret } = require('../environments');

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
  const { id: userGoogleId } = me.data;
  const userGoogleEmail = me.data.emails && me.data.emails.length && me.data.emails[0].value;
  return {
    id: userGoogleId,
    email: userGoogleEmail,
    tokens,
  };
};

module.exports = { urlGoogle, getGoogleAccountFromCode };
