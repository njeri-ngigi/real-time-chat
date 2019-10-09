const dotenv = require('dotenv');

dotenv.config();

const { PORT = 3000, GoogleClientID = '', GoogleClientSecret = '' } = process.env;

module.exports = {
  PORT, GoogleClientID, GoogleClientSecret,
};
