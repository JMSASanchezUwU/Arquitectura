const Compra = require("../models/Compra");

//Método para guardar el compra en la base de datos
exports.crearcompra = async (req, res) => {
  try {
    let compra;
    //Se crea el compra
    compra = new Compra(req.body);

    await compra.save();
    res.send(compra);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}

// Definimos el método para obtener un compra
exports.obtenercompra = async (req, res) => {
  try {
    // Buscamos al compra en la base de datos por su ID
    const compra = await Compra.findById(req.params.id);

    // Si no se encuentra el compra, retornamos un error 404
    if (!compra) {
      return res.status(404).json({ msg: "El compra no existe" });
    }
    // Retornamos el compra actualizado como respuesta
    res.json(compra);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};