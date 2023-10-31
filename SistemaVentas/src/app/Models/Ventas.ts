export class Ventas {
    _id?: number;
    nombreCliente?: string;
    emailCliente?: string;
    direccionCliente?: string;
    fechaCompra?: Date;
    estatus?: string;
    telefono?: string;
    total?: number;
    compraProducto: {
      nombreProducto: string;
      precio: number;
      img: string;
      cantidad:number;
      subtotal?:number;
    }[];
    
    constructor(
       nombreCliente: string,
       emailCliente: string,
       direccionCliente: string,
       fechaCompra: Date,
       estatus: string,
       telefono: string,
       total: number,
       compraProducto: { 
        nombreProducto: string;
        precio: number; 
        img: string;
        cantidad:number; }[]
      ) {
          this.nombreCliente = nombreCliente;
          this.emailCliente = emailCliente;
          this.direccionCliente = direccionCliente;
          this.fechaCompra = fechaCompra;
          this.estatus = estatus;
          this.telefono = telefono;
          this.total = total;
          this.compraProducto = compraProducto;
        }
}



    // this.nombreProducto = nombreProducto;
      // this.precio = precio;
      // this.img = img;
// nombreProducto: string, precio: number, img: string, 
        //  compraProducto: Array<{
        //     nombreProducto: string;
        //     precio: number;
        //     img: string;
        //   }>  
            // nombreProducto: string;
    // precio: number;
    // img: string;
    // compraProducto: Array<{
    //     nombreProducto: string;
    //     precio: number;
    //     img: string;
    //   }>;
