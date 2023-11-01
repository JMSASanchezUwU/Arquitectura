const mongoose = require('mongoose');

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
    estatus: {
      type: String,
      required: false,
      default: "Pedido enviado",
    },
    fechaCompra: {
      type: String,
      default: () => new Date().toLocaleString(),
      required: false,
    },
    telefonoCliente: {
      type: Number,
      required: false,
    },
    total:{
      type: Number,
      required: false
    },
    numGuia: {
      type: String,
      required: true
    },
    compraProducto: [{
      nombreProducto: String,
      precio: Number,
      img: String,
    }],
    paqueteria: [{
      nombrePaqueteria: String,
    }],
    transportista: [{
      nombreTransportista: String,
      telefono: Number,
      placa: String,
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