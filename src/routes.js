const express = require('express');
const { redirect, loginOrSignup } = require('./controllers/users');

const router = express();

router.post('/login', redirect);
router.get('/google-auth', loginOrSignup);

module.exports = router;
