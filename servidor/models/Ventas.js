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
      required: false
    },
    nombrePaqueteria:{
      type: String,
      required: false
    },
    nombreTransportista:{
      type: String,
      required: false
    },
    telefono:{
      type: String,
      required: false
    },
    placa:{
      type: String,
      required: false
    },
    tipoEnvioSeleccionado:{
      type: String,
      required: false
    },
    compraProducto: [{
      nombreProducto: String,
      precio: Number,
      img: String,
      subtotal: Number,
      cantidad: Number
    }],
  }, {
    collection: 'Ventas'
  });
  

module.exports = mongoose.model('Ventas', compraSchema);
