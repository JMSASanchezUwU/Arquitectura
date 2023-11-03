const express = require('express');
const router = express.Router();
const transportistaController = require('../controllers/transportistaController');

//api rutas
router.post('/', transportistaController.crearTransportista);


module.exports = router;