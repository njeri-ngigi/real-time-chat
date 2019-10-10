const express = require('express');
const ENV = require('./environment');
const router = require('./routes');
const connectDb = require('./models/database');

const app = express();

const { PORT } = ENV;

app.use(express.json());
app.use('/api/v1', router);

connectDb();

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}`);
});
