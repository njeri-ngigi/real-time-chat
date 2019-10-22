/* eslint-disable no-console */
const express = require('express');
const http = require('http');
const cors = require('cors');
const socketIO = require('socket.io');
const ENV = require('./environment');
const router = require('./routes');
const connectDb = require('./models/database');

const app = express();

const { PORT, ORIGIN_URL: origin } = ENV;

const corsOptions = { origin };

app.use(cors(corsOptions));
app.use(express.json());
app.use('/api/v1', router);

const server = http.createServer(app);
const io = socketIO(server);

connectDb();

io.on('connection', (socket) => {
  console.log('New user connected');
  socket.on('send message', (data) => {
    io.sockets.emit('send message', data);
  });
  socket.on('disconnect', () => console.log('User disconnected'));
});

server.listen(PORT, () => {
  console.log(`App running on port ${PORT}`);
});
