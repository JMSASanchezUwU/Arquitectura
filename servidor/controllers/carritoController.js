const Ventas = require("../models/Ventas");
const Transportista = require("../models/Transportista");
const Inventario = require("../models/Inventario");
const { enviarEmailCompra } = require('../services/email'); // Asegúrate de tener la ruta correcta
const Carrito = require('../models/Carrito'); // Importa el modelo de Carrito si lo tienes en otro archivo


// Método para guardar la venta en la base de datos
exports.crearVenta = async (req, res) => {
  try {
    // Generar un número de guía aleatorio
    const numGuia = generateRandomGuid();

    // Seleccionar un transportista disponible al azar
    const transportistaDisponible = await obtenerTransportistaDisponible();
    
    if (transportistaDisponible) {
      const ventaData = {
        numGuia: numGuia,
        nombrePaqueteria: transportistaDisponible.paqueteria,
        nombreTransportista: transportistaDisponible.nombreTransportista,
        telefono: transportistaDisponible.telefono,
        placa: transportistaDisponible.placa,
        // tipoEnvioSeleccionado: tipoEnvioSeleccionado,
        ...req.body, // Usar los datos de venta del cuerpo de la solicitud
      };

      
      // Itera sobre los productos vendidos
      for (const productoVendido of req.body.compraProducto) {
        const nombreProducto = productoVendido.nombreProducto;
        const cantidadVendida = productoVendido.cantidad;

        // Busca el producto en el inventario por nombre
        const productoInventario = await Inventario.findOne({ nombreProducto });

        if (productoInventario) {
          // Actualiza la cantidad disponible en el inventario
          const nuevaCantidadDisponible = productoInventario.cantidad - cantidadVendida;
          if (nuevaCantidadDisponible >= 0) {
            productoInventario.cantidad = nuevaCantidadDisponible;
            await productoInventario.save();
          } else {
            // Si no hay suficientes productos disponibles, maneja la lógica de error aquí
            return res.status(400).json({ error: `No hay suficientes "${nombreProducto}" disponibles en el inventario.` });
          }
        } else {
          // Si el producto no se encuentra en el inventario, maneja la lógica de error aquí
          return res.status(400).json({ error: `El producto "${nombreProducto}" no se encuentra en el inventario.` });
        }
      }

      const venta = new Ventas(ventaData);
      await venta.save();
      
      await enviarEmailCompra(venta, venta.emailCliente);

      // Actualiza el estado del transportista a no disponible
      await Transportista.findByIdAndUpdate(transportistaDisponible._id, {
        disponible: false,
      });

      res.status(201).json(venta);
    } else {
      res.status(500).send("No hay transportistas disponibles.");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};


// Función para generar un número de guía aleatorio
function generateRandomGuid() {
  const length = 8; // Longitud del número de guía
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"; // Caracteres válidos en el número de guía
  let numGuia = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    numGuia += characters.charAt(randomIndex);
  }

  return numGuia;
}


// Función para obtener un transportista disponible al azar
async function obtenerTransportistaDisponible() {
  try {
    // Encuentra todos los transportistas disponibles
    const transportistasDisponibles = await Transportista.find();

    // Si hay transportistas disponibles, selecciona uno al azar
    if (transportistasDisponibles.length > 0) {
      const randomIndex = Math.floor(Math.random() * transportistasDisponibles.length);
      return transportistasDisponibles[randomIndex];
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}


// Definimos el método para mostrar los productos
exports.mostrarArticulo = async (req, res) => {
  try {
    const articulo = await Ventas.findById(req.params.id);

    if (!articulo) {
      return res.status(404).json({ msg: "El artículo no está disponible" });
    }

    // Asegúrate de que la cantidad a restar sea proporcionada en la solicitud
    const cantidadARestar = parseInt(req.body.cantidad);

    if (isNaN(cantidadARestar)) {
      return res.status(400).json({ msg: "La cantidad proporcionada no es válida" });
    }

    // Verifica si hay suficiente inventario antes de restar
    if (articulo.cantidad >= cantidadARestar) {
      articulo.cantidad -= cantidadARestar;
      await articulo.save();
      res.json(articulo);
    } else {
      res.status(400).json({ msg: "No hay suficiente inventario para este artículo" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

// Controlador
// ...

// Método para mostrar un artículo por su ID
exports.mostrarArticuloPorId = async (req, res) => {
  try {
    const articulo = await Inventario.findById(req.params.id);
    if (!articulo) {
      return res.status(404).json({ msg: "El artículo no está disponible" });
    }
    res.json(articulo);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

// Método para mostrar todos los artículos
exports.mostrarTodosLosArticulos = async (req, res) => {
  try {
    const articulos = await Inventario.find();
    res.json(articulos);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};


const addProductCart = async (req, res) => {
  const { nombreProducto, img, precio } = req.body;

  /* Nos fijamos si tenemos el producto */
  const estaEnProducts = await Inventario.findOne({ nombreProducto });

  /* Nos fijamos si todos los campos vienen con info */
  const noEstaVacio = nombreProducto !== "" && img !== "" && precio !== "";

  /* Nos fijamos si el producto ya esta en el carrito */
  const estaEnElCarrito = await Ventas.findOne({ name });

  /* Si no tenemos el producto */
  if (!estaEnProducts) {
    res.status(400).json({
      mensaje: "Este producto no se encuentra en nuestra base de datos",
    });

    /* Si nos envian algo y no esta en el carrito lo agregamos */
  } else if (noEstaVacio && !estaEnElCarrito) {
    const newProductInCart = new Inventario({ nombreProducto, img, precio, cantidad: 1 });

    /* Y actualizamos la prop inCart: true en nuestros productos */
    await Product.findByIdAndUpdate(
      estaEnProducts?._id,
      { inCart: true, name, img, price },
      { new: true }
    )
      .then((product) => {
        newProductInCart.save();
        res.json({
          mensaje: `El producto fue agregado al carrito`,
          product,
        });
      })
      .catch((error) => console.error(error));

    /* Y si esta en el carrito avisamos */
  } else if (estaEnElCarrito) {
    res.status(400).json({
      mensaje: "El producto ya esta en el carrito",
    });
  }
  
};


exports.actualizarCompraCarrito = async (req, res) => {
  try {
    const { tipoEnvioSeleccionado, emailCliente } = req.body;
    
    // Busca la compra en la base de datos por su ID
    const ventas = await Ventas.findById(req.params.id);

    if (tipoEnvioSeleccionado === 'paqueteria') {
      // Envía el correo con el PDF adjunto
      await enviarEmailCompra(compra, emailCliente);
    }

    if (!ventas) {
      return res.status(404).json({ msg: "Lo siento, la compra no fue encontrada." });
    }

    // Actualiza las propiedades de la compra con los valores recibidos en la solicitud
    ventas.tipoEnvioSeleccionado = tipoEnvioSeleccionado;
    // Guarda los cambios en la base de datos
    await ventas.save();

    // Retorna la compra actualizada como respuesta
    res.json(ventas);
  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error al procesar la solicitud.");
  }
};