import { Compra } from '../Models/Compra';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CompraService {
  urlCompra = 'http://localhost:4000/api/Compra/';
  urlProveedor = 'http://localhost:4000/api/Proveedor/';
  urlProducto = 'http://localhost:4000/api/Producto/';
  constructor(private http: HttpClient) { }

  // Método para crear una compra
  crearCompra(compra: Compra): Observable<any> {
    return this.http.post(this.urlCompra, compra);
  }
  // Método para obtener una compra por ID
  getCompra(id: string): Observable<any> {
    return this.http.get(this.urlCompra + id);
  }
  // Método para obtener todas las compras
  getCompras(): Observable<any> {
    return this.http.get(this.urlCompra);
  }
  ////////////////Proveedores////////////////////

  getProveedor(id: string): Observable<any> {
    return this.http.get(this.urlProveedor + id);
  }
  getProveedores(): Observable<any> {
    return this.http.get(this.urlProveedor);
  }

  ////////////////Productos////////////////////

  getProducto(id: string): Observable<any> {
    return this.http.get(this.urlProducto + id);
  }
  getProductos(nombreProveedor:string): Observable<any> {
    return this.http.get(this.urlProducto + nombreProveedor);
  }
}
