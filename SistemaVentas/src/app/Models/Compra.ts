export class Compra {
    _id?: string;
    nombreProveedor: string;
    emailProveedor: string;
    direccionProveedor: string;
    fechaCompra?: string;
    status?: string;
    comentario?: string;
    total?: number;
    productos: {
      nombreProducto: string;
      precio: number;
      img: string;
      cantidad:number;
      subtotal?:number;
    }[];
  
    constructor(
      nombreProveedor: string,
      emailProveedor: string,
      direccionProveedor: string,
      fechaCompra: string,
      status: string,
      comentario: string,
      productos: { nombreProducto: string; precio: number; img: string; cantidad:number }[]
    ) {
      this.nombreProveedor = nombreProveedor;
      this.emailProveedor = emailProveedor;
      this.direccionProveedor = direccionProveedor;
      this.fechaCompra = fechaCompra;
      this.status = status;
      this.comentario = comentario;
      this.productos = productos;
    }
  }
  