
const sendMessage = (req, res) => {
  const { message, receiver } = req.body;
  res.send('hello');
};

module.exports = {
  sendMessage,
};
