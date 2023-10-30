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
export class InventarioService {
  urlCarrito = 'http://localhost:4000/api/Carrito'
  urlInventario = 'http://localhost:4000/api/Inventario/';
  constructor(private http: HttpClient) { }

  // Método para crear una compra
  comprarProductoInv(compraP: Inventario): Observable<any> {
    console.log(compraP);
    return this.http.post(this.urlInventario, compraP, httpOptions);
  }

  // Método para obtener todas las compras
  getCompras(): Observable<any> {
    return this.http.get(this.urlCarrito);
  } 


  ////////////////Productos////////////////////
getArticulos(): Observable<any> {
  return this.http.get(this.urlInventario);
}
}
