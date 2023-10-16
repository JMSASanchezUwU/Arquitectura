const mongoose = require('mongoose');

const proveedorSchema = mongoose.Schema({
    nombreProveedor: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    direccion: {
        type: String,
        required: true
    }
}, {
    collection: 'Proveedor'
});

module.exports = mongoose.model('Proveedor', proveedorSchema);