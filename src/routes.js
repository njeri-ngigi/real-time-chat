const express = require('express');
const { sayHello } = require('./controllers/hello');

const router = express();

router.get('/', sayHello);

module.exports = router;
