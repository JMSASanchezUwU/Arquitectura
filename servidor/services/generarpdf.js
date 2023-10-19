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

const generatePDF = (compraData) => {
    var totalPrecio = 0; // Inicializa la variable para la suma de precios
  
    var docDefinition = {
      content: [
        { text: 'Detalles de la compra', style: 'header' },
        { text: `\nProveedor: ${compraData.nombreProveedor}`, margin: [0, 5] },
        { text: `Dirección: ${compraData.direccionProveedor}`, margin: [0, 5] },
        { text: `Fecha de compra: ${compraData.fechaCompra}`, margin: [0, 5] },
        {text:'_______________________________________________________________________________________________'},
        { text: 'Productos:', style: 'subheader', margin: [0, 20], alignment: 'center' },
      ],
      styles: {
        header: {
          fontSize: 24,
          bold: true,
        },
        subheader: {
          fontSize: 16,
          bold: true,
        },
      },
    };
  
    // Agregar productos si están disponibles
    if (compraData.productos && compraData.productos.length > 0) {
      compraData.productos.forEach((producto, index) => {
        totalPrecio += producto.precio; // Suma el precio de cada producto
        docDefinition.content.push(
          { text: `Producto ${index + 1}:`, bold: true, margin: [0, 10] },
          `Nombre: ${producto.nombreProducto}`,
          `Precio: ${producto.precio}`,
          `Imagen: ${producto.img}`,
        );
      });
  
      // Agregar el total al final del PDF
      docDefinition.content.push(
        {text:'_______________________________________________________________________________________________'},
        { text: 'Total de la compra:', bold: true, margin: [0, 20], alignment: 'right' },
        { text: `Precio total: $${totalPrecio.toFixed(2)}`, alignment: 'right' } // Formatea el total a dos decimales
      );
    }
  
    var pdfDoc = printer.createPdfKitDocument(docDefinition);
    pdfDoc.pipe(fs.createWriteStream('pdfs/basics.pdf'));
    pdfDoc.end();
  
    return pdfDocRuta ="pdfs/basics.pdf";
  }; 

module.exports = { generatePDF };