const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', (req, res)=> {
    //TODO: IMPROVE AND ADD QUERY DATABASE
    res.render('trainers/addTrainer')
})

router.get('/list',(req, res) => {
    //TODO: IMPROVE AND ADD QUERY DATABASE
    res.render('trainers/listTrainer')
})

module.exports = router;
