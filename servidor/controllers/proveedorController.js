const Proveerdor = require("../models/Proveerdor");


//Método para guardar el proveedor en la base de datos
exports.crearProveedor = async (req, res) => {
  try {
    let proveedor;
    //Se crea el proveedor
    proveedor = new Proveerdor(req.body);

    await proveedor.save();
    res.send(proveedor);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};


// Definimos el método para obtener un proveedor
exports.obtenerProveedor = async (req, res) => {
  try {
    // Buscamos al proveedor en la base de datos por su ID
    const proveedor = await Proveerdor.findById(req.params.id);

    // Si no se encuentra el proveedor, retornamos un error 404
    if (!proveedor) {
      return res.status(404).json({ msg: "El proveedor no existe" });
    }
    // Retornamos el proveedor actualizado como respuesta
    res.json(proveedor);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};

exports.obtenerProveedores = async (res) => {
  try {
    const proveedores = await Proveerdor.find();
    res.json(proveedores);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}