const Ventas = require("../models/Ventas");
const Inventario = require("../models/Inventario");

//Método para guardar el producto en la base de datos
exports.crearArticulo = async (req, res) => {
  try {
    //Se crea el producto
    item = new Ventas(req.body);

    await item.save();
    res.status(201).json(item);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
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
