const express = require('express');
const router = express.Router();
const pool = require('../database')

router.get('/add', (req, res) => {
    res.render('clients/addClient')
});

router.post('/add', (req,res) => {
    console.log(req.body);
    
})

router.get('/listClients', (req,res) => {
    res.render('listar');
})

module.exports = router;