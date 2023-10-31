import { Carrito } from './../Models/Carrito';
import { Inventario } from '../Models/Inventario';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  urlCarrito = 'http://localhost:4000/api/Carrito'
  urlInventario = 'http://localhost:4000/api/Inventario/';
  constructor(private http: HttpClient) { }

  // Método para crear una compra
  // comprarProductoInv(compraP: Inventario): Observable<any> {
  //   console.log(compraP);
  //   return this.http.post(this.urlCarrito, compraP, httpOptions);
  // }

  // Método para obtener todas las compras
  getCompras(): Observable<any> {
    return this.http.get(this.urlInventario);
  } 

  guardarEnCarrito(item: Carrito): Observable<any> {
    // Define las cabeceras para la solicitud
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };

    return this.http.post(this.urlCarrito, item, httpOptions);
  }

  ////////////////Productos////////////////////
  // getProductos(categorias:string): Observable<any> {
  //   const params = new HttpParams()
  //     .set('r', categorias)
  //   return this.http.get(this.urlInventario , {params});
  // }
}