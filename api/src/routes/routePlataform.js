const { Router } = require('express');
const { Platform } = require("../db.js")
const router = Router();


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/Plataform', async (req, res) => {
    try {
        let plataform = await Platform.findAll()
        res.status(200).send(plataform);

    } catch (error) {
        console.log('Error al pedir Plataformas', error)
    }
});

module.exports = router;


