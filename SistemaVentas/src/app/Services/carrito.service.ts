import { Carrito } from './../Models/Carrito';
import { Inventario } from '../Models/Inventario';
import { Ventas } from '../Models/Ventas';
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
  urlProducto = 'http://localhost:4000/api/Producto/';
  compraCarritoService: any;
  
  constructor(private http: HttpClient) {

   }

  // Método para crear una compra
  crearCompra(venta: Ventas): Observable<any> {
    console.log(venta);
    return this.http.post(this.urlCarrito, venta, httpOptions);
  }

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

  async actualizarCompra(id: string, tipoEnvioSeleccionado: string, emailCliente: string) {
    try {
      const response = await this.compraCarritoService.actualizarCompraCarrito(id, tipoEnvioSeleccionado, emailCliente).toPromise();
      console.log('Respuesta del backend:', response);
      // Realiza cualquier manejo adicional con la respuesta del backend si es necesario
    } catch (error) {
      console.error('Error al actualizar compra:', error);
    }
  }
  

}
