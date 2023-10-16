import { Injectable } from '@angular/core';
import jsPDF from 'jspdf';
import { Compra } from '../Models/Compra';

@Injectable({
  providedIn: 'root'
})
export class PdfGenerationService {
  constructor() { }

  generarPDF(compra: Compra): string {
    const doc = new jsPDF();

    // Contenido del PDF
    doc.text('Detalles de la compra', 10, 10);
    doc.text(`Proveedor: ${compra.nombreProveedor}`, 10, 20);
    doc.text(`Dirección: ${compra.direccionProveedor}`, 10, 30);
    doc.text(`Fecha de compra: ${compra.fechaCompra}`, 10, 40);
    doc.text(`Estado: ${compra.status}`, 10, 50);

    // Añade productos (puedes personalizar esto)
    let yPosition = 60;
    compra.productos.forEach((producto, index) => {
      yPosition += 10;
      doc.text(`Producto ${index + 1}:`, 10, yPosition);
      yPosition += 10;
      doc.text(`Nombre: ${producto.nombreProducto}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Precio: ${producto.precio}`, 10, yPosition);
      yPosition += 10;
      doc.text(`Imagen: ${producto.img}`, 10, yPosition);
    })

    // Genera el contenido del PDF como una cadena base64
    const pdfContent = doc.output('datauristring');

    return pdfContent;
  }
}
