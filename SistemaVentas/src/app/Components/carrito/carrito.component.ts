import { Component } from '@angular/core';
import { Carrito } from '../../Models/Carrito';
import { CarritoService } from 'src/app/Services/carrito.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Inventario } from '../../Models/Inventario';

 @Component({
   selector: 'app-carrito',
   templateUrl: './carrito.component.html',
   styleUrls: ['./carrito.component.css']
 })
 export class CarritoComponent {
   carritoSeleccionados: any[] = [];
   cliente: any = [];
   carrito: any = [];
   total: any = [];

   constructor(//private pdfService: PdfGenerationService,
     private carritoService: CarritoService,
     private toastr: ToastrService,
     private router: Router) { }

   ngOnInit() {
   
   }

 //Seleccionar al provedor y ejecutar el metodo para obtener los productos
 seleccionarCategoria(event: Event) {
 const nombreProducto = (event.target as HTMLSelectElement).value; // Obtenemos el valor seleccionado

  if (nombreProducto) {
      
     this.getProductos(nombreProducto);
   }
   // Limpia la lista de productos seleccionados
    this.carritoSeleccionados = [];
 }
 //Obtener productos de acuerdo al proveedor seleccionado
 getProductos(nombreProductos: string) {
   this.carritoService.getProductos(nombreProductos).subscribe(
     res => {
       this.carrito = res;
     },
     err => console.log(err)
   );
 }

//     // //Obtener provedor por su nombre
//  getProveedor(nombreProveedor: string) {
//   this.compraService.getProveedor(nombreProveedor).subscribe(
//      res => {
//        this.proveedor = res;
//      },
//      err => console.log(err)
//    );
//  }
  //Metodo para añadir o quitar productos seleccionados a la lista
  seleccionarProducto(producto: any) {
    const index = this.carritoSeleccionados.findIndex((p) => p.nombreProducto === producto.nombreProducto);
     if (index !== -1) {
   // El producto ya está seleccionado, así que lo deseleccionamos
       this.carritoSeleccionados.splice(index, 1);
     } else {
       // El producto no está seleccionado, lo añadimos a la lista de productos seleccionados
       this.carritoSeleccionados.push(producto);
     }
   }

  //Metodo para guardar la compra en BD
   realizarCompra() {
     if (this.carritoSeleccionados.length === 0) {
       alert("Selecciona al menos un producto");
    return;
     }
  
    const carritoSeleccionados = this.carritoSeleccionados.map((producto) => ({
    nombreProducto: producto.nombreProducto,
    precio: producto.precio,
   img: producto.img,
    }));
  
    const compraP: Carrito = {
      nombreProducto: this.carrito.nombreProducto,
      precio: this.carrito.precio,
      cantidad: this.carrito.cantidad,
      img: this.carrito.img,
    };
    
  
    // Llama al servicio para crear la compra
    this.carritoService.comprarProductoInv(compraP).subscribe(
      (res) => {
        this.toastr.success('La Solicitud de compra se registró con éxito!', 'Solicitud Registrada!');
        

        // Puedes realizar más acciones aquí si es necesario
      },
      (err) => console.error('Error al crear la compra:', err)
    );
    // Limpia la lista de productos seleccionados
    this.carritoSeleccionados = [];
  }
  
  isSelected(producto: any) {
    return this.carritoSeleccionados.some((p) => p.nombreProducto === producto.nombreProducto);
  }
}
