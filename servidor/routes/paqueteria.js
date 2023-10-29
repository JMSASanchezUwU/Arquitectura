const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

//api rutas
router.post('/', ventaController.crearPaqueteria);
router.get('/', ventaController.obtenerPaqueteria);

module.exports = router;