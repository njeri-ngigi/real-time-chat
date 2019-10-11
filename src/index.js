const express = require('express');
const io = require('socket.io');
const ENV = require('./environment');
const router = require('./routes');
const connectDb = require('./models/database');

const app = express();

const { PORT } = ENV;

app.use(express.json());
app.use('/api/v1', router);

connectDb();

const server = app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`App running on port ${PORT}`);
});

const ioConnection = io(server);

ioConnection.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('New user connected');
});
