const mongoose = require('mongoose');

const trasnportistaSchema = mongoose.Schema({
    nombreTransportista: {
        type: String,
        required: true
    },
    telefono: {
        type: Number,
        required: true
    },
    placa: {
        type: String,
        required: true
    },
    paqueteria: {
        type: String,
        required: true
    },
}, {
    collection: 'Transportista'
});

module.exports = mongoose.model('Transportista', trasnportistaSchema);