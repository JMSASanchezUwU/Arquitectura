const Producto = require("../models/Producto");

//Método para guardar el producto en la base de datos
exports.crearProducto = async (req, res) => {
  try {
    let producto;
    //Se crea el producto
    producto = new Producto(req.body);

    await producto.save();
    res.send(producto);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}

// Definimos el método para obtener un producto
exports.obtenerProducto = async (req, res) => {
  try {
    // Buscamos al producto en la base de datos por su ID
    const producto = await Producto.findById(req.params.id);

    // Si no se encuentra el producto, retornamos un error 404
    if (!producto) {
      return res.status(404).json({ msg: "El producto no existe" });
    }
    // Retornamos el producto actualizado como respuesta
    res.json(producto);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

exports.obtenerProductos = async (req, res) => {
  const  nombreProveedor  = req.query.nombreProveedor; 
  try {
    const productos = await Producto.find({ nombreProveedor: nombreProveedor });
    res.json(productos);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}
