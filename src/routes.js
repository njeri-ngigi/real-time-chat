const express = require('express');
const { redirect, loginOrSignup } = require('./controllers/users');
const {
  sendMessage, getUserContacts, getContactMessages, getAllContacts,
} = require('./controllers/messages');
const { validateContact, validateMessage } = require('./middlewares/validate');
const { validateAuthentication } = require('./middlewares/auth');

const router = express.Router();

router.post('/login', redirect);
router.get('/google-auth', loginOrSignup);
router.post('/send', validateAuthentication, validateContact, validateMessage, sendMessage);
router.get('/user/contacts', validateAuthentication, getUserContacts);
router.post('/user/contacts/messages', validateAuthentication, validateContact, getContactMessages);
router.get('/contacts', validateAuthentication, getAllContacts);

module.exports = router;
