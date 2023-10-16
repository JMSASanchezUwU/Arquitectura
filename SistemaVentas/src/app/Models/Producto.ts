export class Producto {
    _id?: number;
    nombreProducto: string;
    precio: number;
    img: string;
    categoria: string;
    nombreProveedor: string;
  
    constructor(nombreProducto: string, precio: number, img: string, categoria: string, nombreProveedor: string) {
      this.nombreProducto = nombreProducto;
      this.precio = precio;
      this.img = img;
      this.categoria = categoria;
      this.nombreProveedor = nombreProveedor;
    }
  }
  