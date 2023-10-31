import { Component } from '@angular/core';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Inventario } from '../../Models/Inventario';
import { Carrito } from 'src/app/Models/Carrito';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {

  urlCompra = 'http://localhost:4000/api/Carrito';
  carrito: any = [];
  carritoSeleccionados: Carrito[] = [];

  constructor(
    private carritoService: CarritoService,
    private toastr: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getCompras();
  }

  getCompras() {
    this.carritoService.guardarEnCarrito(this.carrito).subscribe(
      res => {
        this.carrito = res;
        this.actualizarCarritoSeleccionados();
        console.log(this.carrito);
      },
      err => console.log(err)
    );
  }

  getProductosSeleccionados(): Carrito[] {
    return this.carritoSeleccionados;
  }
  
  actualizarCarritoSeleccionados() {
    // Actualiza carritoSeleccionados con los datos de carrito
    this.carritoSeleccionados = this.carrito.map((item: any) => {
      return {
        nombreProducto: item.nombreProducto,
        precio: item.precio,
        img: item.img,
        cantidad: 1 // Puedes ajustar esto según tus necesidades
      };
    });
  }
}
