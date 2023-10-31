import mercadopago from 'mercadopago'
import { Ventas } from '../models/Ventas'

export const CrearOrden = async (req, res) => {
    mercadopago.configure({
        access_token: "TEST-6017691533455239-103010-3632dc95d744dc1fdecdfd2e903c3e8f-1528576419",
    });

const result = await mercadopago.preferences.create({
        items:{
            nombreCliente: Ventas.nombreCliente,
            emailCliente: Ventas.emailCliente,
            direccionCliente: Ventas.direccionCliente,
            fechaCompra: Ventas.fechaCompra,
            estatus: Ventas.estatus,
            telefono: Ventas.telefono,
            total: Ventas.total,
            compraProducto: Ventas.compraProductom,
            currency_id: "MX"
        }
    })
    console.log(result)
    res.send("Creando orden");
}
