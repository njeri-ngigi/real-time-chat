const { MessageModel } = require('../models/message');
const { findUser } = require('./user');

const findOrCreateContact = (user, email) => {
  const { contacts } = user;
  const foundContact = contacts.find((contact) => contact.email === email);
  if (!foundContact) { user.contacts.push({ email }); }
  user.save();
};

// eslint-disable-next-line consistent-return
const createMessage = async ({ message, sender, receiver }) => MessageModel.create({
  message, sender, receiver,
});

// eslint-disable-next-line consistent-return
const sendMessage = async ({ sender, receiver, message }) => {
  try {
    const userSender = await findUser(sender);
    const userReceiver = await findUser(receiver);

    findOrCreateContact(userSender, receiver);
    if (sender !== receiver) { findOrCreateContact(userReceiver, sender); }

    return createMessage({ message, sender, receiver });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

// eslint-disable-next-line consistent-return
const fetchContacts = async (email) => {
  try {
    const user = await findUser(email);
    return user.contacts || [];
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};

// eslint-disable-next-line consistent-return
const fetchContactMessages = (sender, receiver) => {
  try {
    return MessageModel.find({
      $or: [{ sender, receiver }, { sender: receiver, receiver: sender }],
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);
  }
};


module.exports = { sendMessage, fetchContacts, fetchContactMessages };
