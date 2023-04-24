const { Router } = require('express');
const { Gender } = require("../db.js")
const router = Router();


// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);


router.get('/Generos', async (req, res) => {
    try {
        let generos = await Gender.findAll()
        res.status(200).send(generos);

    } catch (error) {
        console.log('Error al Pedir Generos', error)
    }
});

module.exports = router;
