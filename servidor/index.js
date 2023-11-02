const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const stripe = require('stripe')('sk_test_51O7S89KzBFaHCOpm7SCWRJ2MVwh8J8npAtxDVINqYg4HbJeDlSkTNozX4gWAnPKEYiejzXAVOxfECJfxNkpLvgQl00nzCznn2K')
const { bot } = require('./services/telegram')


//Se crear el servidor
const app = express();

//Conectamos a la base de datos
conectarDB();
app.use(cors());
app.use(express.json());

/*
const usuarioRoutes = require('./routes/usuario');
app.use('/api/Usuario', usuarioRoutes);

const libroRoutes = require('./routes/libro');
app.use('/api/Libro', libroRoutes);
 */
app.post('/stripe_cehckout', async (req, res) => { // Agrega "async" aquí
    const stripeToken = req.body.stripeToken;
    const total = req.body.total;

    const cantidadInMX = Math.round(total * 100);
    const chargeObject = stripe.charges.create({
        amount: cantidadInMX,
        currency: 'mx',
        capture: false,
        receipt_email: 'ossytres8@gmail.com'
    });

    // AGREGAR TRANSACCION A BASE DE DATOS
    try {
        await stripe.charges.capture(chargeObject.id);
        res.json(chargeObject);
    } catch (error) {
        await stripe.refunds.create({ charge: chargeObject.id });
        res.json(chargeObject);
    }
});



const proveedorRoutes = require('./routes/proveedor');
app.use('/api/Proveerdor', proveedorRoutes);

const productoRoutes = require('./routes/producto');
app.use('/api/Producto', productoRoutes);

const compraRoutes = require('./routes/compra');
app.use('/api/Compra', compraRoutes);

const carritoRoutes = require('./routes/carrito');
app.use('/api/Carrito', carritoRoutes);

const inventarioRoutes = require('./routes/inventario');
app.use('/api/Inventario', inventarioRoutes);

// const pagoRoutes = require('./routes/pago');
// app.use('/api/Pago', pagoRoutes);



app.listen(4000, () =>{
    console.log('El servidor esta corriendo perfectamente!!!');
})