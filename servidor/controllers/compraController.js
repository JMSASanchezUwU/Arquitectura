const Compra = require("../models/Compra");
const { sendEmailWithPDF } = require('../services/email');



//Método para guardar el compra en la base de datos
exports.crearcompra = async (req, res) => {
  try {
    const compraData = req.body;
    const compra = new Compra(compraData);

    // Guarda la compra en la base de datos
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

exports.obtenercompras = async (req,res) => {
  try {
    const compras = await Compra.find();
    res.json(compras);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}

exports.obtenercomprasFiltro = async (req,res) => {
  try {
    const compras = await Compra.find({ status : 'En Proceso' });
    res.json(compras);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
}

// Definimos el método para actualizar un usuario
exports.actualizarCompra = async (req, res) => {
  try {
    // Extraemos las propiedades de la compra que se van a actualizar desde la solicitud
    const { status, comentario} = req.body;
    // Buscamos la compra en la base de datos por su ID
    const compra = await Compra.findById(req.params.id);

    if(status == "Autorizado"){
      // Envía el correo con el PDF adjunto
      await sendEmailWithPDF(compra, compra.emailProveedor); 
    }

    // Si no se encuentra la compra, retornamos un error 404
    if (!compra) {
      return res.status(404).json({ msg: "El compra no existe" });
    }

    // Actualizamos las propiedades de la compra con los valores recibidos en la solicitud
    compra.status = status;
    compra.comentario = comentario;
    // Guardamos los cambios en la base de datos
    await compra.save();

    // Retornamos el usuario actualizado como respuesta
    res.json(compra);

  } catch (error) {
    console.log(error);
    res.status(500).send("Hubo un error!!! :(");
  }
};