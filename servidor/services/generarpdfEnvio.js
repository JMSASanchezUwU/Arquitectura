var fonts = {
	Roboto: {
		normal: 'fonts/Roboto-Regular.ttf',
		bold: 'fonts/Roboto-Medium.ttf',
		italics: 'fonts/Roboto-Italic.ttf',
		bolditalics: 'fonts/Roboto-MediumItalic.ttf'
	}
};

var PdfPrinter = require('pdfmake');
var printer = new PdfPrinter(fonts);
var fs = require('fs');

const generatePDF = (datosVenta) => {
  var totalPrecio = 0; // Inicializa la variable para la suma de precios
  var estiloNegrita = { bold: true };

  var docDefinition = {
      content: [
          { text: 'Detalles de la compra', style: 'header', alignment: 'center'},
          { text: `\nTipo de envio: ${datosVenta.tipoEnvioSeleccionado}`, margin: [0, 5] },
          { text: `Producto: ${datosVenta.nombreProducto}`, margin: [0, 5] },
          { text: `Datos del cliente: ${datosVenta.nombreCliente}`, margin: [0, 5] },
          {
              layout: 'lightHorizontalLines', // Establece el diseño de la tabla
              table: {
                headerRows: 1,
                widths: ['auto', 'auto', 'auto', 'auto', 'auto'], // Ancho de las columnas
                body: [
                  [{ text: 'Producto', style: estiloNegrita }, { text: 'Precio', style: estiloNegrita }, { text: 'Cantidad', style: estiloNegrita }, { text: 'Subtotal', style: estiloNegrita }, { text: 'Imagen', style: estiloNegrita }], // Encabezado de la tabla
                    ...datosVenta.productos.map((producto) => [
                        { text: producto.nombreProducto, alignment: 'center' }, // Centrar el texto
                        { text: `$${producto.precio.toFixed(2)}`, alignment: 'center' },
                        { text: producto.cantidad, alignment: 'center' },
                        { text: `$${producto.subtotal.toFixed(2)}`, alignment: 'center' },
                        { image: "images/" + producto.img, fit: [40, 40], alignment: 'center' } // Centrar la imagen
                    ]),
                ],
            },                        
          },
      ],
      styles: {
          header: {
              fontSize: 24,
              bold: true,
          },
      },
  };

  // Suma el precio de cada producto
  totalPrecio = compraData.productos.reduce((acc, producto) => acc + producto.subtotal, 0);

  docDefinition.content.push(
    {text:'\n\n_______________________________________________________________________________________________'},
      { text: 'Total de la compra:', style: estiloNegrita, margin: [0, 20], alignment: 'right' },
      { text: `Precio total: $${totalPrecio.toFixed(2)}`, alignment: 'right'}
  );

  var pdfDoc = printer.createPdfKitDocument(docDefinition);
  pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
  pdfDoc.end();

  return pdfDocRuta = "pdfs/basics.pdf";
};

module.exports = { generatePDF };
