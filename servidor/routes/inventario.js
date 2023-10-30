const express = require('express');
const router = express.Router();
const inventarioController = require('../controllers/inventarioController');

//api rutas
router.post('/', inventarioController.crearArticulo);
router.get('/:id', inventarioController.obtenerArticulo);
router.get('/', inventarioController.obtenerArticulos);
// router.delete('/', compraController.obtenercomprasFiltro);
// router.put('/:id', compraController.actualizarCompra);

module.exports = router;