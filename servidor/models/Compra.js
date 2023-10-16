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
        default: () => new Date().toLocaleString(), // Valor por defecto: fecha y hora actual
        required: true
    },
    status:{
        type: String,
        default: "En Proceso"
    },
    comentario:{
        type: String,
        required: false
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
