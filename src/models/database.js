const mongoose = require('mongoose');
const { mongodbUrl } = require('../environment');

const connectDb = () => {
  mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
    .then(() => {
      // eslint-disable-next-line no-console
      console.log('Database connected successfully');
    })
    .catch(() => {
      // eslint-disable-next-line no-console
      console.log('Database connection failed');
    });
};

module.exports = connectDb;
