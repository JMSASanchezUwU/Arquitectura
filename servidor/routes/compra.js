const express = require('express');
const router = express.Router();
const compraController = require('../controllers/compraController');

//api rutas
router.post('/', compraController.crearcompra);
router.get('/:id',  compraController.obtenercompra);
router.get('/', compraController.obtenercompras);
router.put('/:id', compraController.actualizarCompra);

module.exports = router;