const Transportista = require("../models/Transportista");
const Paqueteria = require("../models/Paqueteria");

//Método para guardar el transportista en la base de datos
exports.crearTransportista = async (req, res) => {
    try {
      const transportista = new Transportista(req.body);
  
      // Guarda la transportista en la base de datos
      await transportista.save();
  
      res.send(transportista);
    } catch (error) {
      console.log(error);
      res.status(500).send('Hubo un error!!! :(');
    }
  }

// Método para obtener información de todos los transportista
exports.obtenerTransportista = async (req, res) => {
    try {
      // Buscamos al Transportista en la base de datos por su ID
      const transportista = await Transportista.findById(req.params.Paqueteria);
  
      // Si no se encuentra el Transportista, retornamos un error 404
      if (!transportista) {
        return res.status(404).json({ msg: "El Transportista no existe" });
      }
      // Retornamos el Transportista actualizado como respuesta
      res.json(transportista);
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error!!! :(");
    }
  };

//Método para guardar la paqueteria en la base de datos
exports.crearPaqueteria = async (req, res) => {
  try {
    const paqueteria = new Paqueteria(req.body);

    // Guarda la paqueteria en la base de datos
    await paqueteria.save();

    res.send(paqueteria);
  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}
  
// Método para obtener información de todos los servicios de paquetería
exports.obtenerPaqueteria = async (req, res) => {
    try {
      // Buscamos al paqueteria en la base de datos por su ID
      const paqueteria = await Paqueteria.findById(req.params.nombrePaqueteria);
  
      // Si no se encuentra el paqueteria, retornamos un error 404
      if (!paqueteria) {
        return res.status(404).json({ msg: "La paqueteria no existe" });
      }
      // Retornamos el paqueteria actualizado como respuesta
      res.json(paqueteria);
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error!!! :(");
    }
  };