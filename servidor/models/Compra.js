const mongoose = require('mongoose');

const compraSchema = mongoose.Schema({
    nombreProveedor: {
        type: String,
        required: true
    },
    emailProveredor: {
        type: String,
        required: true
    },
    direccionProveredor: {
        type: String,
        required: true
    },
    fechaCompra: {
        type: String,
        required: true
    },
    status:{
        type: String,
        required: true,
    },
    fechaStatus:{
        type: String,
        required: true
    },
    comentario:{
        type: String,
        required: true
    },
    productos: {
        nombreProducto:{
            type: String,
            required: true,
        },
        precio:{
            type: Number,
            required: true,
        },
        img:{
            type: String,
            required: true,
        }
    }
}, {
    collection: 'Compra' 
});

module.exports = mongoose.model('Compra', compraSchema);
