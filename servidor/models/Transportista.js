const mongoose = require('mongoose');

const trasnportistaSchema = mongoose.Schema({
    nombreTransportista: {
        type: String,
        required: true
    },
    telefono: {
        type: String,
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
    disponible:{
        type:Boolean,
        require:true
    }
}, {
    collection: 'Transportista'
});

module.exports = mongoose.model('Transportista', trasnportistaSchema);