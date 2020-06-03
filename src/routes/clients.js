const express = require('express');
const router = express.Router();
const pool = require('../database')

router.get('/add', async (req, res) => {
    const tipoDocumento = await pool.query('select * from tipo_documento');
    const tipoMembresia = await pool.query('select * from tipo_membresia');
    res.render('clients/addClient', {tipoDocumento,tipoMembresia});
});

router.post('/add',async (req,res) => {
    const newClient = {
        ...req.body,
        idSede:1,
        estadoId:1
    }
    await pool.query('INSERT INTO clientes set ?' , [newClient])
    req.flash('success', 'cliente agregado correctamente')
    res.redirect('/clients');   
})

router.get('/', async (req,res) => {
    const clients = await pool.query(`SELECT c.id, c.nombre, c.apellidoP, c.apellidoM, c.email, es.descripcion as estado,m.descripcion as membresia
                                         FROM clientes c
                                         INNER JOIN estados es on c.estadoId = es.id_est 
                                         INNER JOIN tipo_membresia m on m.id = c.tipoMembresiaId
                                         where c.estadoId = 1`);
    console.log(clients)
    res.render('clients/list', {clients});
})

router.get('/edit/:id', async(req, res) => {
    const {id} = req.params;
    console.log(id)
    const client = await pool.query('select * from clientes where id=?', [id]);
    const tipoDocumento = await pool.query('select * from tipo_documento');
    const tipoMembresia = await pool.query('select * from tipo_membresia');
    console.log(client[0]);
    res.render('clients/edit', {client :client[0],tipoDocumento,tipoMembresia})
})


router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    await pool.query("update from set estadoId = ? clientes where id = ?", [2, id])
    req.flash('success', 'cliente eliminado correctamente')
    res.redirect('/');
});



router.post('/edit/:id', async (req,res)=> {
    const {id} = req.params;
    const updatedClient = {
        ...req,body,
    }
    await pool.query('update clientes set ? where id=?', [updatedClient, id]);
    req.flash('success', 'cliente actualizado correctamente')
    res.redirect('/clients');
})

module.exports = router;