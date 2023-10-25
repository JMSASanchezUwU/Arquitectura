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
    tipoTransporte: {
        type: String,
        required: true
    }
}, {
    collection: 'Transportista'
});

module.exports = mongoose.model('Transportista', trasnportistaSchema);