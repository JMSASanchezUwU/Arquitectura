const mongoose = require('mongoose');

const Articulo = require('./Inventario');

const compraSchema = mongoose.Schema({
    nombreCliente: {
      type: String,
      required: true,
    },
    emailCliente: {
      type: String,
      required: true,
    },
    direccionCliente: {
      type: String,
      required: true,
    },
    fechaCompra: {
      type: String,
      default: () => new Date().toLocaleString(),
      required: true,
    },
    estatus: {
      type: String,
      default: "En proceso de pago",
    },
    telefono: {
      type: number,
      required: true,
    },
    total:{
      type: Number,
      required: false
  },
    compraProducto: [{
      nombreProducto: String,
      precio: Number,
      img: String,
    }],
  }, {
    collection: 'Ventas'
  });
  

module.exports = mongoose.model('Ventas', compraSchema);
