import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { InventarioService } from 'src/app/Services/inventario.service';
import { Carrito } from 'src/app/Models/Carrito';
import { CarritoService } from 'src/app/Services/carrito.service';
import { Ventas } from 'src/app/Models/Ventas';
import { EnvioStrategy} from 'src/app/Services/envio-strategy';

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
  categoria: any;
  categorias: any = [];
  mostrarCantidadInput: boolean = false;
  invt: any = [];
  cantidad: any;
  tipoEnvioSeleccionado: EnvioStrategy | null = null; 



  constructor(//private pdfService: PdfGenerationService,
    private inventarioService: InventarioService,
   // private carritoService: CarritoService,
   // private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
        this.getCategorias();
        this.getArticulos();
  }

  
  getCategorias() {
    this.inventarioService.getCategorias().subscribe(
      res => {
        this.categorias = res; // Utiliza una variable diferente, por ejemplo, this.categorias
      },
      err => console.log(err)
    );
  }
  

  seleccionarCategoria(event: Event) {
    const categoria = (event.target as HTMLSelectElement).value; // Obtenemos el valor seleccionado

    if (categoria) {

      this.getCategoria(categoria);
      this.getInvt(categoria);
    }
    // Limpia la lista de productos seleccionados
    this.categoriaSeleccionada = [];
  }


  getCategoria(categoria: string) {
    this.inventarioService.getCategoria(categoria).subscribe(
      res => {
        this.categoria = res;
      },
      err => console.log(err)
    );
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

  getInvt(nombreProducto: string) {
    this.inventarioService.getInv(nombreProducto).subscribe(
      res => {
        this.categoria = res;
      },
      err => console.log(err)
    );
  }

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

  // seleccionarTipoEnvio(opcion: string) {
  //   switch (opcion) {
  //     case 'paqueteria':
  //       this.tipoEnvioSeleccionado = new PaqueteriaStrategy();
  //       break;
  //     case 'correo':
  //      this.tipoEnvioSeleccionado = new CorreoStrategy();
  //       break;
  //     case 'express':
  //       this.tipoEnvioSeleccionado = new ExpressStrategy();
  //       break;
  //     default:
  //       // Manejo de casos no definidos
  //       break;
  //   }
  //  // Ejecutar la estrategia seleccionada
  //   if (this.tipoEnvioSeleccionado) {
  //     this.tipoEnvioSeleccionado.alertaEnvio(); // Muestra la alerta
  //   }
  // }
  

  redirigirACarrito() {
    // Convierte this.itemsSeleccionados a JSON
    const itemsJSON = JSON.stringify(this.itemsSeleccionados);
    // Redirige a la página de carrito con los datos JSON como parámetro
    this.router.navigate(['/carrito', { items: itemsJSON }]);
  }
}
