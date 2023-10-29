const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

//api rutas
router.post('/', ventaController.crearTransportista);
router.get('/:id',  ventaController.obtenercompra);
router.get('/', ventaController.obtenerTransportista);
router.delete('/', ventaController.obtenercomprasFiltro);
router.put('/:id', ventaController.actualizarCompra);

module.exports = router;