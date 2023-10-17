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

  const  nombreProveedor  = req.query.nombreProveedor; 
  try {
    // Buscamos al proveedor en la base de datos por su Nombre
    const proveedor = await Proveerdor.findOne({ nombreProveedor: nombreProveedor });

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

exports.obtenerProveedores = async (req,res) => {
  try {
    const proveedores = await Proveerdor.find();
    res.json(proveedores);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}