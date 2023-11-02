import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/Models/Carrito';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent {
  stripeToken: string = '123';
  urlCompra = 'http://localhost:4000/api/Carrito';
  carrito: any = [];
  carritoSeleccionados: Carrito[] = [];
  http: any;
  productos: any[] = [];

  constructor(
    private carritoService: CarritoService,
    private toastr: ToastrService,
    // private router: Router,
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
  
  

  procesarPago() {
    // Genera un token de tarjeta de crédito usando Stripe.js (debes incluir la lógica para obtener el token)
    // Por ejemplo: this.stripe.createToken({ card: cardElement }).then(result => this.stripeToken = result.token.id);

    // Una vez que tengas el token de tarjeta de crédito, puedes realizar la solicitud al servidor
    if (this.stripeToken) {
      this.http.post(this.urlCompra, { stripeToken: this.stripeToken }).subscribe(
        (response: any) => {
          console.log('Pago exitoso', response);
          // Maneja la respuesta de pago exitoso
        },
        (error: any) => {
          console.error('Error en el pago', error);
          // Maneja el error en el pago
        }
      );
    } else {
      console.error('Token de tarjeta de crédito no disponible');
    }
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
