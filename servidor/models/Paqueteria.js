const mongoose = require('mongoose');

const paqueteriaSchema = mongoose.Schema({
    nombrePaqueteria: {
        type: String,
        required: true
    },
}, {
    collection: 'Paqueteria'
});

module.exports = mongoose.model('Paqueteria', paqueteriaSchema);