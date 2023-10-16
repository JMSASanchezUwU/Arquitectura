export class Proveedor {
    _id?: number;
    nombreProveedor: string;
    email: string;
    direccion: string;
  
    constructor(nombreProveedor: string, email: string, direccion: string, logo: string ) {
      this.nombreProveedor = nombreProveedor;
      this.email = email;
      this.direccion = direccion;
    }
  }
  