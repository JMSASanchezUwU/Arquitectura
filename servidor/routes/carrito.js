const express = require('express');
const router = express.Router();
const carritoController = require('../controllers/carritoController');

// Rutas para la gestión del carrito
router.post('/', carritoController.crearArticulo);
router.get('/:id', carritoController.mostrarArticuloPorId);
router.get('/', carritoController.mostrarTodosLosArticulos);


module.exports = router;
