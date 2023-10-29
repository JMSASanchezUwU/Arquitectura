export class Carrito {
    _id?: number;
    nombreProducto: string;
    precio: number;
    img: string;
    cantidad: number;
  
    constructor(nombreProducto: string, precio: number, img: string, cantidad:number) {
      this.nombreProducto = nombreProducto;
      this.precio = precio;
      this.img = img;
      this.cantidad = cantidad;
    }
  }