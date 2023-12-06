import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { Carrito } from 'src/app/Models/Carrito';
import { Ventas } from 'src/app/Models/Ventas';
import { EnvioStrategy, PaqueteriaStrategy, CorreoStrategy, ExpressStrategy, EstrategiaEnvioContext} from 'src/app/Services/envio-strategy';
import { HttpClient } from '@angular/common/http';

declare var paypal:any;

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})

export class CarritoComponent implements OnInit{

  @ViewChild('paypal',{static:true}) paypalElement! : ElementRef;
  
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
 estrategiaEnvio: EnvioStrategy | any;
 estrategiaContexto?: EstrategiaEnvioContext;
 tipoEnvioSeleccionadoString: string | undefined;
 //tipoEnvioSeleccionado: string | undefined = undefined; // O inicializado con el valor por defecto

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
          console.log(this.productos)
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
        // setTimeout(() => {
        //   //window.location.href='/producto'; 
        // }, 2000); // 2000 milisegundos (2 segundos)
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
      tipoEnvioSeleccionado: this.estrategiaEnvio.tipoEnvioSeleccionadoString
    };

    this.carritoService.crearCompra(venta).subscribe();
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


  seleccionarTipoEnvio(event: Event) {
    const selectedValue = (event.target as HTMLSelectElement).value;
    if (selectedValue) {
      switch (selectedValue) {
        case 'paqueteria':
          this.tipoEnvioSeleccionadoString = 'Paqueteria'; // Asigna la cadena representativa
          this.estrategiaEnvio = new PaqueteriaStrategy(this.tipoEnvioSeleccionadoString);
          this.estrategiaContexto?.cambiarEstrategia(this.estrategiaEnvio);
          this.estrategiaEnvio.alertaEnvio(); // Muestra alerta
          break;
        case 'correo':
          
          this.tipoEnvioSeleccionadoString = 'Correo'; // Asigna la cadena representativa
          this.estrategiaEnvio = new CorreoStrategy(this.tipoEnvioSeleccionadoString);
          this.estrategiaContexto?.cambiarEstrategia(this.estrategiaEnvio);
          this.estrategiaEnvio.alertaEnvio(); // Muestra alerta
          break;
        case 'express':
         
          this.tipoEnvioSeleccionadoString = 'Express'; // Asigna la cadena representativa
          this.estrategiaEnvio = new ExpressStrategy(this.tipoEnvioSeleccionadoString);
          this.estrategiaContexto?.cambiarEstrategia(this.estrategiaEnvio);
          this.estrategiaEnvio.alertaEnvio(); // Muestra alerta
          break;
        default:
          // Manejo de casos no definidos
          break;
      }
    }
  }
  
  

  // seleccionarTipoEnvio(event: any) {
  //   const selectedValue = (event.target as HTMLSelectElement).value;
  //   this.tipoEnvioSeleccionado = selectedValue;
  //   console.log('Tipo de envío seleccionado:', this.tipoEnvioSeleccionado);
  // }

}


