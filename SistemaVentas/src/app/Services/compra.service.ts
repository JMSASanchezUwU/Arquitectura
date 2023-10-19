import { Compra } from '../Models/Compra';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CompraService {
  urlCompra = 'http://localhost:4000/api/Compra/';
  urlProveedor = 'http://localhost:4000/api/Proveerdor/';
  urlProveedor2 = 'http://localhost:4000/api/Proveerdor/proveedor';
  urlProducto = 'http://localhost:4000/api/Producto/';
  constructor(private http: HttpClient) { }

  // Método para crear una compra
  crearCompra(compra: Compra): Observable<any> {
    console.log(compra);
    return this.http.post(this.urlCompra, compra, httpOptions);
  }

  // Método para obtener todas las compras
  getCompras(): Observable<any> {
    return this.http.get(this.urlCompra);
  } 


  ////////////////Proveedores////////////////////

  getProveedor(nombreProveedor:string): Observable<any> {
    const params = new HttpParams()
    .set('nombreProveedor', nombreProveedor)
    return this.http.get(this.urlProveedor2, {params});
  }
  
  getProveedores(): Observable<any> {
    return this.http.get(this.urlProveedor);
  }

  ////////////////Productos////////////////////
  getProductos(nombreProveedor:string): Observable<any> {
    const params = new HttpParams()
      .set('nombreProveedor', nombreProveedor)
    return this.http.get(this.urlProducto , {params});
  }
}
