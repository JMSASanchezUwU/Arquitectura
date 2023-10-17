const express = require('express');
const router = express.Router();
const proveedorController = require('../controllers/proveedorController');

//api rutas
router.post('/', proveedorController.crearProveedor);
router.get('/proveedor',  proveedorController.obtenerProveedor);
router.get('/', proveedorController.obtenerProveedores);


module.exports = router;