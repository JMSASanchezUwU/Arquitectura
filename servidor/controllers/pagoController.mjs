// const Ventas = require('../../models/Ventas')
// const { getPaymentDetail } = require('../../services/stripe')
// const { generatePaymentIntent, generatePaymentMethod } = require('../../services/stripe')


// //TODO: Buscamos orden y y solictamos a stripe los detalles

// const checkItem = async (req, res) => {
//     try {
//         const { id } = req.params;

//         //TODO: Buscamos orden en nuestra base de datos

//         const resOrder = await Ventas.findOne({ direccionCliente: id })

//         //TODO: Solicitamos a stripe que nos devuelva la informacion de la orden

//         const detailStripe = await getPaymentDetail(resOrder.stripeId)

//         const status = detailStripe.status.includes('apobo') ? 'aprobado' : 'fallo'

//         //TODO: Actualizamos nuestra orden con el estatus

//         await Venats.findOneAndUpdate({ direccionCliente: id }, { status })

//         res.send({ pagoProducto: detailStripe })

//     } catch (e) {
//         console.log(e.message)
//         res.status(500);
//         res.send({ error: 'Algo ocurrio' })
//     }
// }

// //TODO: Buscamos en la base de datos si existe una orden con el localizador

// const getItem = async (req, res) => {
//     const { id } = req.params
//     const userData = await Ventas.findOne({ direccionCliente: id })
//     res.send({ pagoProducto: userData })
// }

// //TODO: Generamos nueva orden y guardamos en base de datos

// const postItem = async (req, res) => {
//   try {
//       const { total, nombreCliente } = req.body
//       const oderRes = await Ventas.create({
//           nombreCliente,
//           total
//       })

//       res.send({ pagoProducto: oderRes })
//   } catch (e) {
//       res.status(500);
//       res.send({ error: 'Algo ocurrio' })
//   }
// }


// //TODO: Buscamos orden y genramos intencion de pago

// const updateItem = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { token } = req.body

//         //TODO: Buscamos orden en nuestra base de datos

//         const resOrder = await Ventas.findOne({ direccionCliente: id })

//         //TODO: Generamos metodo de pago en Stripe

//         const responseMethod = await generatePaymentMethod(token) //TODO: 🔴 Token magico!

//         //TODO: Generamos intencion de pago

//         const resPaymentIntent = await generatePaymentIntent(
//             {
//                 total: resOrder.amount,
//                 nombreCliente: resOrder.name,
//                 payment_method: responseMethod.id
//             }
//         )

//         //TODO: Actualizamos  orden con id de intencion de pago
//         await Ventas.findOneAndUpdate({ localizator: id }, {
//             stripeId: resPaymentIntent.id
//         })

//         res.send({ pagoProducto: resPaymentIntent })

//     } catch (e) {
//         console.log(e.message)
//         res.status(500);
//         res.send({ error: 'Algo ocurrio' })
//     }
// }

// module.exports = { updateItem }
// module.exports = { postItem }
// module.exports = { getItem }
// module.exports = { checkItem }