const express = require('express');
const router = express.Router();
const pool = require('../database')

router.get('/add', (req, res) => {
    res.render('clients/addClient')
});

router.post('/add',async (req,res) => {
    await pool.query('INSERT INTO nuevousuario set ?' , [req.body])
    req.flash('success', 'cliente agregado correctamente')
    res.redirect('/clients');   
})

router.get('/', async (req,res) => {
    const clients = await pool.query('SELECT * FROM nuevousuario');
    res.render('clients/list', {clients});
})

router.get('/delete/:id', async (req, res) => {
    await pool.query("delete from nuevousuario where id_Nuevo = ?", [req.params.id])
    req.flash('success', 'cliente eliminado correctamente')
    res.redirect('/');
})

router.get('/edit/:id', async(req, res) => {
    const {id} = req.params
    const client = await pool.query('select * from nuevousuario where id_Nuevo=?', [id]);
    res.render('clients/edit', {client :client[0]})
})

router.post('/edit/:id', async (req,res)=> {
    const {id} = req.params
    await pool.query('update nuevousuario set ? where id=?', [req.body,id]);
    req.flash('success', 'cliente actualizado correctamente')
    res.redirect('/clients');
})

module.exports = router;