import { Component } from '@angular/core';
import { Inventario } from '../../Models/Inventario';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InventarioService } from 'src/app/Services/inventario.service';
import { Carrito } from 'src/app/Models/Carrito';
import { CarritoService } from 'src/app/Services/carrito.service';
import { Ventas } from 'src/app/Models/Ventas';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent {
  carritoSeleccionados: Carrito[] = [];
  itemsSeleccionados: any[] = [];
  listaVenta: Ventas[] = [];
  categoriaSeleccionada: any[] = [];
  mostrarCantidadInput: boolean = false;
  invt: any = [];
  cantidad: any;



  constructor(//private pdfService: PdfGenerationService,
    private inventarioService: InventarioService,
    private carritoService: CarritoService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getArticulos();
  }

  seleccionarCategoria(event: Event) {
    const categoria = (event.target as HTMLSelectElement).value; // Obtenemos el valor seleccionado

    if (categoria) {

      this.getArticulos();
    }
    // Limpia la lista de productos seleccionados
    this.categoriaSeleccionada = [];
  }


  //Obtener productos de acuerdo al proveedor seleccionado
  getArticulos() {
    this.inventarioService.getArticulos().subscribe(
      res => {
        this.invt = res;
      },
      err => {
        console.error('Error al obtener los productos:', err);
        // Puedes agregar código adicional para manejar el error en la interfaz de usuario si es necesario.
      }
    );
  }


  //Metodo para guardar la compra en BD
  // realizarCompra() {
  //   if (this.carritoSeleccionados.length === 0) {
  //     alert("Selecciona al menos un producto");
  //     return;
  //   }

  //   // Mapea los productos seleccionados para crear la compra
  //   const carritoSeleccionados = this.carritoSeleccionados.map((producto) => ({
  //     nombreProducto: producto.nombreProducto,
  //     precio: producto.precio,
  //     img: producto.img,
  //   }));

  //   // Llama al servicio para crear la compra
  //   this.carritoService.guardarEnCarrito(carritoSeleccionados).subscribe(
  //     (res) => {
  //       this.toastr.success('La Solicitud de compra se registró con éxito!', 'Solicitud Registrada!');
  //       this.carritoSeleccionados = []; // Limpia la lista de productos seleccionados
  //     },
  //     (err) => console.error('Error al crear la compra:', err)
  //   );
  // }


  // isSelected(producto: any) {
  //   return this.carritoSeleccionados.some((p) => p.nombreProducto === producto.nombreProducto);
  // }

  ///METODO PARA AGREGAR LOS PRODUCTOS AL CARRITO
  // seleccionarProducto(item: any) {
  //   item.nombreProducto,
  //   item.cantidad,
  //   item.precio
  //   const index = this.carritoSeleccionados.findIndex((p) => p.nombreProducto === item.nombreProducto);
  //   if (index !== -1) {
  //     // El producto ya está seleccionado, así que lo deseleccionamos
  //     this.carritoSeleccionados.splice(index, 1);
  //     this.mostrarCantidadInput = false;
  //   } else {
  //     // El producto no está seleccionado, lo añadimos a la lista de productos seleccionados
  //     this.carritoSeleccionados.push(item);
  //     this.mostrarCantidadInput = true;
  //   }
  //   console.log(index);
  // }
  // seleccionarProducto(item: any) {
  //   const iCarrito: Carrito = {
  //     nombreProducto: item.nombreProducto,
  //     precio: item.precio,
  //     img: item.img,
  //     cantidad: 1,
  //   };

  //   // Agregar el producto al arreglo de productos seleccionados
  //   this.carritoSeleccionados.push(iCarrito);
  //   console.log(this.carritoSeleccionados); // Para verificar si se agregan correctamente
  //   // No limpies el arreglo aquí, ya que necesitas mantener los productos seleccionados
  // }

  seleccionarProducto(item: any) {
    const index = this.itemsSeleccionados.findIndex((p) => p.nombreProducto === item.nombreProducto);
    if (index !== -1) {
      // El producto ya está seleccionado, así que lo deseleccionamos
      this.itemsSeleccionados.splice(index, 1);
      this.mostrarCantidadInput = false;
    } else {
      // El producto no está seleccionado, lo añadimos a la lista de productos seleccionados
      this.itemsSeleccionados.push(item);
      this.mostrarCantidadInput = true;
      
    }
  }

  isSelected(item: any) {
    return this.itemsSeleccionados.some((p) => p.nombreProducto === item.nombreProducto);
  }

  redirigirACarrito() {
    // Convierte this.itemsSeleccionados a JSON
    const itemsJSON = JSON.stringify(this.itemsSeleccionados);
    // Redirige a la página de carrito con los datos JSON como parámetro
    this.router.navigate(['/carrito', { items: itemsJSON }]);
  }
}
