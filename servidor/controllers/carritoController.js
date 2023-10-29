const Inventario = require("../models/Inventario");

//Método para guardar el producto en la base de datos
exports.crearArticulo = async (req, res) => {
  try {
    let articulo;
    //Se crea el producto
    articulo = new Articulo(req.body);

    await articulo.save();
    res.send(articulo);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}


// Definimos el método para mostrar los productos
exports.mostrarArticulo = async (req, res) => {
  try {
    const articulo = await Articulo.findById(req.params.id);

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



// exports.obtenerProductos = async (req, res) => {
//   const  nombreProveedor  = req.query.nombreProveedor; 
//   try {
//     const productos = await Producto.find({ nombreProveedor: nombreProveedor });
//     res.json(productos);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send('Hubo un error!!! :(');
//   }
// }
