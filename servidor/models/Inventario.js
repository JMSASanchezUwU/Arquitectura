const mongoose = require('mongoose');

const inventarioSchema = mongoose.Schema({
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
    cantidadDisponible:{
        type: Number,
        required: true
    },
    cantidad:{
        type: Number,
        require: false,
    },
    disponible:{
        type: Boolean,
        required: true
    }
    }, {
    collection: 'Inventario'
});

module.exports = mongoose.model('Inventario', inventarioSchema);