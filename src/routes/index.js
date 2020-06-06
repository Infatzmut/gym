const express = require('express')
const router = express.Router();

const clients = require('./clients');
const trainers = require('./trainers');
const users = require('./users');

router.use('/clients', clients);
router.use('/trainers', trainers);
//router.use('/users', users);

module.exports = router;
