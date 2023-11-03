import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/Models/Carrito';
import { Ventas } from 'src/app/Models/Ventas';
import { HttpClient } from '@angular/common/http';

declare var paypal:any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit{

  @ViewChild('paypal',{static:true}) paypalElement! : ElementRef;
  


  stripeToken: string = '123';
  urlCompra = 'http://localhost:4000/api/Carrito';
  carrito: any = [];
  carritoSeleccionados: Carrito[] = [];
  http: any;
  productos: any[] = [];
  total:any;

  nombre:any;
  correo:any;
  direccion:any;
  telefono:any;

  constructor(
    private carritoService: CarritoService,
    private toastr: ToastrService,
    private router: Router,
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

    paypal.Buttons({
      createOrder: (data : any, actions : any)=>{
        return actions.order.create({
          intent:'CAPTURE',
          purchase_units: [
            { 
              amount:{
                currency_code:'MXN',
                value: this.total
              }
            }
          ],
          application_context:{
            brand_name:'Mi Tienda',
            landing_page:'NO_PREFERENCE',
            user_action: 'PAY_NOW'
          }
        })
      },
      onApprove: async (data: any, actions: any) => {
        const order = await actions.order.capture();
        console.log(order);
        this.toastr.success('Pago Exitoso!!!');
        this.realizarCompra();
        setTimeout(() => {
          window.location.href='/producto'; 
        }, 2000); // 2000 milisegundos (2 segundos)
      },
      onError: (err: any) => {
        console.log('Error en el pago', err);
        this.toastr.error('Ocurrió un error en el pago :(.');
      }      
    }).render(this.paypalElement.nativeElement);
  }
  

  realizarCompra() {
  
    const productos = this.productos.map((producto) => ({
      nombreProducto: producto.nombreProducto,
      precio: producto.precio,
      img: producto.img,
      subtotal:producto.cantidadDisponible*producto.precio,
      cantidad: producto.cantidadDisponible, 
    }));
  
    const venta: Ventas = {
      nombreCliente: this.nombre,
      emailCliente: this.correo,
      direccionCliente: this.direccion,
      telefonoCliente:this.telefono,
      total: this.total,
      compraProducto: productos, // Ahora es una lista de productos
    };

    this.carritoService.crearCompra(venta).subscribe();
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
    let total=0;
    for (const car of this.carrito) {
      total += car.precio * car.cantidadDisponible;
      this.total = total;
    }
    return this.total;
  }
}
