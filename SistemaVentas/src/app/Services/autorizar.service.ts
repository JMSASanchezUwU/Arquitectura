import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Compra } from '../Models/Compra';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutorizarService {
  urlCompra = 'http://localhost:4000/api/Compra/';

  constructor(private http: HttpClient) { }

    // Método para editar un usuario
    actualizarCompra(id:string, compra:Compra):Observable<any>{
      return this.http.put(this.urlCompra + id, compra);
    }
}
