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
      cantidad: Number,
      subtotal: {
        type: Number,
        default: function() {
          return this.precio * this.cantidad;
        }
      },
    }],
    total: {
      type: Number,
      default: function() {
        return this.productos.reduce((acc, producto) => acc + producto.subtotal, 0);
      }
    },
  }, {
    collection: 'Compra'
  });
  

module.exports = mongoose.model('Compra', compraSchema);
