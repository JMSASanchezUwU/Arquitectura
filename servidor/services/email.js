const nodemailer = require('nodemailer');
const { generatePDF } = require('../services/generarpdf'); // Importa la función de generación de PDF
const path = require('path'); // Importa el módulo 'path' de Node.js
require('dotenv').config({ path: 'variables.env' });

// Configuración de nodemailer
const transporter = nodemailer.createTransport({
  service: 'gmail', // Por ejemplo, 'Gmail'
  auth: {
    user: process.env.email,
    pass: process.env.pass,
  },
});

// Función para enviar el correo con el PDF adjunto
const sendEmailWithPDF = async (compraData, recipientEmail) => {
  // Genera el PDF y obtén su ruta
  const pdfPath = generatePDF(compraData);

  const mailOptions = {
    from: process.env.email,
    to: recipientEmail,
    subject: 'Detalles de la compra',
    text: 'Adjunto encontrarás los detalles de la compra en formato PDF.',
    attachments: [
      {
        filename: 'detalle_compra.pdf',
        path: pdfPath, // Usa la ruta del archivo PDF en lugar del contenido
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};


// CORREO AL SELECCIONAR TIPO DE ENVIO EN COMPRA

const enviarEmailCompra = async (datosVenta, recipientEmail) => {
  
  // Genera el PDF y obtén su ruta
  const pdfPath = generatePDF(datosVenta);

  const mailOptions = {
    from: process.env.email,
    to: recipientEmail,
    subject: 'Detalles de la compra',
    text: 'Adjunto encontrarás los detalles de la compra en formato PDF.',
    attachments: [
      {
        filename: 'recibo_compra.pdf',
        path: pdfPath, // Usa la ruta del archivo PDF en lugar del contenido
      },
    ],
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Correo enviado con éxito');
  } catch (error) {
    console.error('Error al enviar el correo:', error);
  }
};




module.exports = { sendEmailWithPDF, enviarEmailCompra };
