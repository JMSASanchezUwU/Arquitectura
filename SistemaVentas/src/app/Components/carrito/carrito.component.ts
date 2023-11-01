import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
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
  productos: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private toastr: ToastrService,
    private route: ActivatedRoute // Agrega ActivatedRoute para acceder a los parámetros de la URL
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      // Recupera los elementos seleccionados de la URL
      const productosJSON = params.get('items');
      
      if (productosJSON) {
        try {
          const productos = JSON.parse(productosJSON);
          // Ahora, 'productos' es un objeto o arreglo que puedes usar
          this.productos = productos;
          this.carrito = this.productos;
          console.log(this.productos  )
        } catch (error) {
          console.error('Error al analizar los elementos de la URL:', error);
        }
      }
    });
  }
  
  

  getCompras() {
    this.carritoService.guardarEnCarrito(this.carrito).subscribe(
      res => {
        this.carrito = res;
        // Actualiza la lista de productos seleccionados
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

  calcularTotal(): number {
    let total = 0;
    for (const car of this.carrito) {
      total += car.precio * car.cantidadDisponible;
    }
    return total;
  }
}
