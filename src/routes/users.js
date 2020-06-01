const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', async (req, res) => {
    await pool.query('Insert into users')
})

router.post('/save', async (req, res) => {

})

router.get('/', async (req, res) => {

})
module.exports = router;