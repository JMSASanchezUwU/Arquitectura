export class Producto {
    _id?: number;
    nombreProducto: string;
    precio: number;
    img: string;
    categoria: string;
    nombreProveedor: string;
    cantidad: number;
    subtotal: number;
  
    constructor(nombreProducto: string, precio: number, img: string, categoria: string, nombreProveedor: string, cantidad: number, subtotal: number) {
      this.nombreProducto = nombreProducto;
      this.precio = precio;
      this.img = img;
      this.categoria = categoria;
      this.nombreProveedor = nombreProveedor;
      this.cantidad = cantidad;
      this.subtotal = subtotal;
    }
  }
  