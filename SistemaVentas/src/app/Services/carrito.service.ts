import { Carrito } from './../Models/Carrito';
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
  urlProducto = 'http://localhost:4000/api/Inventario/';
  constructor(private http: HttpClient) { }

  // Método para crear una compra
  comprarProductoInv(compraP: Carrito): Observable<any> {
    console.log(compraP);
    return this.http.post(this.urlCarrito, compraP, httpOptions);
  }

  // Método para obtener todas las compras
  getCompras(): Observable<any> {
    return this.http.get(this.urlCarrito);
  } 


  ////////////////Productos////////////////////
  getProductos(nombreProducto:string): Observable<any> {
    const params = new HttpParams()
      .set('r', nombreProducto)
    return this.http.get(this.urlProducto , {params});
  }
}
