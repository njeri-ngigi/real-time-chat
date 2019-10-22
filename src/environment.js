const dotenv = require('dotenv');

dotenv.config();

const {
  PORT = 3000,
  ORIGIN_URL = '',
  GoogleClientID = '',
  GoogleClientSecret = '',
  mongodbUrl = '',
  AppSecret,
} = process.env;

module.exports = {
  PORT, ORIGIN_URL, GoogleClientID, GoogleClientSecret, mongodbUrl, AppSecret,
};
