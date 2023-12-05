const express = require('express');
const conectarDB = require('./config/db');
const cors = require("cors");
const { bot } = require('./services/telegram')


//Se crear el servidor
const app = express();

//Conectamos a la base de datos
conectarDB();
app.use(cors());
app.use(express.json());

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

const ventasRoutes = require('./routes/venta');
app.use('/api/Ventas', ventasRoutes);

const transportistaRoutes = require('./routes/transportista');
app.use('/api/Transportista', transportistaRoutes);

app.listen(4000, () =>{
    console.log('El servidor esta corriendo perfectamente!!!');
})