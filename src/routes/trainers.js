const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', async (req, res)=> {
    //TODO: IMPROVE AND ADD QUERY DATABASE
    await pool.query('insert into trainer set ?', [req.body])
    res.render('trainers/addTrainer')
})

router.get('/list',async (req, res) => {
    //TODO: IMPROVE AND ADD QUERY DATABASE
    const trainers = await pool.query('select * from trainers')
    res.render('trainers/listTrainer', {trainers})
})

module.exports = router;
