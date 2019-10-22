const { sendMessage: send, fetchContacts, fetchContactMessages } = require('../services/message');
const { fetchAllUsers } = require('../services/user');

const sendMessage = async (req, res) => {
  const { message, receiver, user } = req.body;

  const response = await send({ sender: user, receiver, message });

  if (!response) return res.status(500).send({ message: 'Something went wrong. Try again.' });

  return res.status(201).send({ data: response });
};

const getUserContacts = async (req, res) => {
  const contacts = await fetchContacts(req.body.user);
  if (!contacts) return res.status(500).send({ message: 'Something went wrong. Try again.' });
  return res.send({ data: contacts });
};

const getContactMessages = async (req, res) => {
  const { user, receiver: contact } = req.body;
  const messages = await fetchContactMessages(user, contact);
  if (!messages) return res.status(500).send({ message: 'Something went wrong. Try again.' });
  return res.send({ data: messages });
};

const getAllContacts = async (req, res) => {
  const contacts = await fetchAllUsers();
  if (!contacts) return res.status(500).send({ message: 'Something went wrong. Try again.' });
  return res.send({ data: contacts });
};

module.exports = {
  sendMessage, getUserContacts, getContactMessages, getAllContacts,
};
