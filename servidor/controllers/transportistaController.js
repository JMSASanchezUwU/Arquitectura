const Transportista = require("../models/Transportista");


//Método para guardar el transportista en la base de datos
exports.crearTransportista = async (req, res) => {
  try {
    let transportista;
    //Se crea el transportista
    transportista = new Transportista(req.body);

    await transportista.save();
    res.send(transportista);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};