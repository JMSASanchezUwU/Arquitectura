const Ventas = require("../models/Ventas");

exports.crearVenta = async (req, res) => {
  try {
    let proveedor;
    //Se crea el proveedor
    venta = new Ventas(req.body);

    await venta.save();
    res.send(venta);

  } catch (error) {
    console.log(error);
    res.status(500).send('Hubo un error!!! :(');
  }
};

// Método para obtener información de todos los servicios de venta
exports.obtenerVentas = async (req, res) => {
    try {
      // Buscamos al venta en la base de datos
      const ventas = await Ventas.find();
  
      // Si no se encuentra el venta, retornamos un error 404
      if (!ventas) {
        return res.status(404).json({ msg: "La venta no existe" });
      }
      // Retornamos el venta actualizado como respuesta
      res.json(ventas);
  
    } catch (error) {
      console.log(error);
      res.status(500).send("Hubo un error!!! :(");
    }
  };