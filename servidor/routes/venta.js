const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/ventaController');

//api rutas
router.get('/', ventaController.obtenerVentas);

module.exports = router;