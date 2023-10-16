const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

//api rutas
router.post('/', proveedorController.crearProveedor);
router.get('/:id',  proveedorController.obtenerProveedor);


module.exports = router;