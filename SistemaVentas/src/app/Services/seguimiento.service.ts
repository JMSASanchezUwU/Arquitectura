import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SeguimientoService {
  urlVenta = 'http://localhost:4000/api/Ventas/';

  constructor(private http: HttpClient) {
    
   }

  getVentas(): Observable<any> {
    return this.http.get(this.urlVenta);
  }

}
