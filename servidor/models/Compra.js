const mongoose = require('mongoose');

const Producto = require('../models/Producto');

const compraSchema = mongoose.Schema({
    nombreProveedor: {
      type: String,
      required: true,
    },
    emailProveedor: {
      type: String,
      required: true,
    },
    direccionProveedor: {
      type: String,
      required: true,
    },
    fechaCompra: {
      type: String,
      default: () => new Date().toLocaleString(),
      required: true,
    },
    status: {
      type: String,
      default: "En Proceso",
    },
    comentario: {
      type: String,
      required: false,
    },
    productos: [{
      nombreProducto: String,
      precio: Number,
      img: String,
    }],
  }, {
    collection: 'Compra'
  });
  

module.exports = mongoose.model('Compra', compraSchema);
