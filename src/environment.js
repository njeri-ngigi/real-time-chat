const dotenv = require('dotenv');

dotenv.config();

const {
  PORT = 3000,
  GoogleClientID = '',
  GoogleClientSecret = '',
  mongodbUrl = '',
  AppSecret,
} = process.env;

module.exports = {
  PORT, GoogleClientID, GoogleClientSecret, mongodbUrl, AppSecret,
};
