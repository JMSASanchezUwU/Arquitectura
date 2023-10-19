import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SolicitudService {
  urlCompra = 'http://localhost:4000/api/Compra/';

  constructor(private http: HttpClient) { }

  // Método para obtener todas las compras
  listarCompras(): Observable<any> {
    return this.http.get(this.urlCompra);
  }
}
