const mongoose = require('mongoose');

const productoSchema = mongoose.Schema({
    nombreProducto:{
        type: String,
        required: true
    },
    precio:{
        type: Number,
        required: true
    },
    img:{
        type: String,
        required: true
    },
    categoria:{
        type: String,
        required: true
    },
    nombreProveedor:{
        type: String,
        required: true
    }
}, {
    collection: 'Producto'
});

module.exports = mongoose.model('Producto', productoSchema);