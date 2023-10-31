const mongoose = require('mongoose');

const Articulo = require('./Inventario');

const compraSchema = mongoose.Schema({
    nombreCliente: {
      type: String,
      required: false,
    },
    emailCliente: {
      type: String,
      required: false,
    },
    direccionCliente: {
      type: String,
      required: false,
    },
    fechaCompra: {
      type: String,
      default: () => new Date().toLocaleString(),
      required: false,
    },
    estatus: {
      type: String,
      default: "En proceso de pago",
    },
    telefono: {
      type: Number,
      required: false,
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

// nombreProducto: {
//   type: String,
//   required: true
// },
// precio: {
//   type: Number,
//   required: true
// },
// img:{
//   type: String,
//   required: true
// }