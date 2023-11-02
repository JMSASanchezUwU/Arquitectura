const express = require('express');
const router = express.Router();
// const payment = require('../controllers/mercadopagoController.mjs');
const compraController = require('../controllers/compraController');

//api rutas
router.post('/', compraController.crearcompra);
router.get('/:id',  compraController.obtenercompra);
router.get('/', compraController.obtenercompras);
router.delete('/', compraController.obtenercomprasFiltro);
router.put('/:id', compraController.actualizarCompra);

module.exports = router;