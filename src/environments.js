const dotenv = require('dotenv');

dotenv.config();

const { PORT = 3000 } = process.env;

module.exports = {
  PORT
}
