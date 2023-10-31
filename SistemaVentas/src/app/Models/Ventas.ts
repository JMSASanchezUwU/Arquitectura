export class Ventas {
    _id?: number;
    nombreCliente: string;
    emailCliente: string;
    direccionCliente: string;
    fechaCompra: Date;
    estatus: string;
    telefono: string;
    total: number;
    nombreProducto: string;
    precio: number;
    img: string;
    // compraProducto: Array<{
    //     nombreProducto: string;
    //     precio: number;
    //     img: string;
    //   }>;
  
    constructor(nombreCliente: string, emailCliente: string,direccionCliente: string, fechaCompra: Date,  estatus: string,
        telefono: string, total: number,  nombreProducto: string, precio: number, img: string
        //  compraProducto: Array<{
        //     nombreProducto: string;
        //     precio: number;
        //     img: string;
        //   }>  
        ) {
      this.nombreCliente = nombreCliente;
      this.emailCliente = emailCliente;
      this.direccionCliente = direccionCliente;
      this.fechaCompra = fechaCompra;
      this.estatus = estatus;
      this.telefono = telefono;
      this.total = total;
      this.nombreProducto = nombreProducto;
      this.precio = precio;
      this.img = img;
      // this.compraProducto = compraProducto;
    }
}

