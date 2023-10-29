export class Inventario {
    _id?: number;
    nombreProducto: string;
    precio: number;
    img: string;
    categoria: string;
    cantidad: number;
    disponible: boolean;
  
    constructor(nombreProducto: string, precio: number, img: string, categoria: string,
      cantidad: number, total: number, disponible: boolean) {
      this.nombreProducto = nombreProducto;
      this.precio = precio;
      this.img = img;
      this.categoria = categoria;
      this.cantidad = cantidad;
      this.disponible = disponible;
    }
  }