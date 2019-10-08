const express = require('express');
const ENV = require('./environments');
const router = require('./routes');

const app = express();

const { PORT } = ENV;

app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
