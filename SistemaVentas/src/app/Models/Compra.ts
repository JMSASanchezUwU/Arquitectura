export class Compra {
    _id?: number;
    nombreProveedor: string;
    emailProveedor: string;
    direccionProveedor: string;
    fechaCompra?: string;
    status?: string;
    comentario?: string;
    productos: {
      nombreProducto: string;
      precio: number;
      img: string;
    }[];
  
    constructor(
      nombreProveedor: string,
      emailProveedor: string,
      direccionProveedor: string,
      fechaCompra: string,
      status: string,
      comentario: string,
      productos: { nombreProducto: string; precio: number; img: string; }[]
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
  