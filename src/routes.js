const express = require('express');
const { redirect, loginOrSignup } = require('./controllers/users');
const { sendMessage } = require('./controllers/messages');
const { validateMessage } = require('./middlewares/validate');
const { validateAuthentication } = require('./middlewares/auth');

const router = express.Router();

router.post('/login', redirect);
router.get('/google-auth', loginOrSignup);
router.post('/send', validateAuthentication, validateMessage, sendMessage);

module.exports = router;
