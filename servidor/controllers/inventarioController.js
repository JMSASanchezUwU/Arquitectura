const Inventario = require("../models/Inventario");

//Método para guardar el producto en la base de datos
exports.crearArticulo = async (req, res) => {
  try {
    let producto;
    //Se crea el producto
    articulo = new Inventario(req.body);

    await articulo.save();
    res.send(articulo);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}

// Definimos el método para obtener un producto
exports.obtenerArticulo = async (req, res) => {
  try {
    // Buscamos al producto en la base de datos por su ID
    const articulo = await Inventario.findById(req.params.id);

    // Si no se encuentra el producto, retornamos un error 404
    if (!articulo) {
      return res.status(404).json({ msg: "El producto no existe" });
    }
    // Retornamos el producto actualizado como respuesta
    res.json(articulo);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

exports.obtenerArticulos = async (req, res) => {
  try {
    // Consulta los artículos donde el atributo "disponible" es verdadero (true)
    const inventario = await Inventario.find({});
    res.json(inventario);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}



