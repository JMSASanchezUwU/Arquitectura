const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

//api rutas
router.post('/', compraController.crearcompra);
router.get('/:id',  compraController.obtenercompra);

module.exports = router;