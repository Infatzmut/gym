const express = require('express');
const router = express.Router();
const pool = require('../database');

router.get('/add', async (req, res)=> {
    //TODO: IMPROVE AND ADD QUERY DATABASE
    const trainers = await pool.query("select * from entrenadores");
    //await pool.query('insert into trainer set ?', [req.body])
    res.render('trainers/addTrainer')
})

router.get('/',async (req, res) => {
    const trainers = await pool.query("select * from entrenadores");
    res.render('trainers/listTrainer', {trainers});
})

router.get('/edit/:id', async(req, res) => {
    const {id} = req.params;
    const client = await pool.query('select * from entrenadores where id=?', [id]);
    const tipoDocumento = await pool.query('select * from tipo_documento');
    const tipoMembresia = await pool.query('select * from tipo_membresia');
    const data = {
        client: client[0],
        tipoDocumento,
        tipoMembresia
    }
    res.render('trainers/edit',data)
})


router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await pool.query("delete from entrenadores where id = ?", [id])
        req.flash('success', 'trainer eliminado correctamente');
        res.redirect('/trainers');
    }catch (error){
        //req.flash('error', error.message);
        console.log(error);
    }
});


router.post('/edit/:id', async (req,res)=> {
    const {id} = req.params;
    const updatedClient = {
        ...req,body,
    }
    await pool.query('update trainers set ? where id=?', [updatedClient, id]);
    req.flash('success', 'trainer actualizado correctamente')
    res.redirect('/trainers');
})


module.exports = router;
