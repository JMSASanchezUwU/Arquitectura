const mongoose = require('mongoose');

const paqueteriaSchema = mongoose.Schema({
    nombrePaqueteria: {
        type: String,
        required: true
    },
    numGuia: {
        type: String,
        required: true
    },
    origen: {
        type: String,
        required: true
    },
    destino: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        required: true,
        default: "Enviado",
    }
}, {
    collection: 'Paqueteria'
});

module.exports = mongoose.model('Paqueteria', paqueteriaSchema);