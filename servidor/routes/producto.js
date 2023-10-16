const express = require('express');
const router = express.Router();
const productoController = require('../controllers/productoController');

//api rutas
router.post('/', productoController.crearProducto);
router.get('/:id',  productoController.obtenerProducto);
router.get('/', productoController.obtenerProductos);

module.exports = router;