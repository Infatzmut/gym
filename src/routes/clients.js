const express = require('express');
const router = express.Router();
const pool = require('../database')
const validator = require('../validations');

router.get('/add', async (req, res) => {
    const tipoDocumento = await pool.query('select * from tipo_documento');
    const tipoMembresia = await pool.query('select * from tipo_membresia');
    res.render('clients/addClient', {tipoDocumento,tipoMembresia});
});

router.post('/add',async (req,res) => {
    const errors = []
    try{
        const newClient = {
            ...req.body,
            idSede:1,
            estadoId:1
        }
        validator.createUser(newClient, errors);
        if(errors.length > 0) {
            console.error(errors);
            req.flash('success',errors.join('\n'));
            res.redirect('/clients/add')
            return;
            //res.sendStatus(404).json(errors.join('\n'));
        }
        await pool.query('INSERT INTO clientes set ?' , [newClient]);
        req.flash('success', 'cliente agregado correctamente')
        res.redirect('/clients/add');    
    }catch(error){
       console.log(error);
       res.send(500).json("Server Error");
    }
})

router.get('/', async (req,res) => {
    const clients = await pool.query(`SELECT c.id, c.nombre, c.apellidoP, c.apellidoM, c.email,m.descripcion as membresia
                                         FROM clientes c 
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
    const data = {
        client: client[0],
        tipoDocumento,
        tipoMembresia
    }
    res.render('clients/edit',data)
})


router.get('/delete/:id', async (req, res) => {
    const {id} = req.params;
    try{
        await pool.query("update clientes set estadoId = ? where id = ?", [2, id])
        req.flash('success', 'cliente eliminado correctamente');
        res.redirect('/clients');
    }catch (error){
        req.flash('error', error);
        console.log(error);
    } 
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