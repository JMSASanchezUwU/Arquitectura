const mongoose = require('mongoose');
// const nanoid = require('nanoid')

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
      default: () => nanoid.nanoid()
    },
    fechaCompra: {
      type: String,
      default: () => new Date().toLocaleString(),
      required: false,
    },
    estatus: {
      type: String,
      enum: ['aprobado', 'fallo', 'en espera'],
      default: 'en espera'
    },
    telefono: {
      type: Number,
      required: false,
    },
    total:{
      type: Number,
      required: false
  },
  stripeId:{
    type: String,
    default: null
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