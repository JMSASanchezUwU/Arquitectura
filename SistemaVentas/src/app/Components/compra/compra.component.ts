import { Component } from '@angular/core';
import { Compra } from '../../Models/Compra';
import { CompraService } from 'src/app/Services/compra.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {

  mostrarCantidadInput: boolean = false;
  productosSeleccionados: any[] = [];
  proveedores: any = [];
  productos: any = [];
  proveedor: any;
  

  constructor(//private pdfService: PdfGenerationService,
    private compraService: CompraService,
    private toastr: ToastrService,) {   }

  ngOnInit() {
    this.getProveedores();
  }

  //Obtener la lista de los provedores
  getProveedores() {
    this.compraService.getProveedores().subscribe(
      res => {
        this.proveedores = res;
      },
      err => console.log(err)
    );
  }
  //Seleccionar al provedor y ejecutar el metodo para obtener los productos
  seleccionarProveedor(event: Event) {
    const nombreProveedor = (event.target as HTMLSelectElement).value; // Obtenemos el valor seleccionado

    if (nombreProveedor) {
      
      this.getProductos(nombreProveedor);
      this.getProveedor(nombreProveedor);
    }
     // Limpia la lista de productos seleccionados
     this.productosSeleccionados = [];
  }
  //Obtener productos de acuerdo al proveedor seleccionado
  getProductos(nombreProveedor: string) {
    this.compraService.getProductos(nombreProveedor).subscribe(
      res => {
        this.productos = res;
      },
      err => console.log(err)
    );
  }

    //Obtener provedor por su nombre
    getProveedor(nombreProveedor: string) {
      this.compraService.getProveedor(nombreProveedor).subscribe(
        res => {
          this.proveedor = res;
        },
        err => console.log(err)
      );
    }
    
  //Metodo para añadir o quitar productos seleccionados a la lista
  seleccionarProducto(producto: any) {
    const index = this.productosSeleccionados.findIndex((p) => p.nombreProducto === producto.nombreProducto);
    if (index !== -1) {
      // El producto ya está seleccionado, así que lo deseleccionamos
      this.productosSeleccionados.splice(index, 1);
      this.mostrarCantidadInput = false;
    } else {
      // El producto no está seleccionado, lo añadimos a la lista de productos seleccionados
      this.productosSeleccionados.push(producto);
      this.mostrarCantidadInput = true;
    }
  }

  //Metodo para guardar la compra en BD
  realizarCompra() {
    if (this.productosSeleccionados.length === 0) {
      this.toastr.error("Selecciona al menos un producto");
      return;
    }
  
    const productosSeleccionados = this.productosSeleccionados.map((producto) => ({
      nombreProducto: producto.nombreProducto,
      precio: producto.precio,
      img: producto.img,
      cantidad: producto.cantidad, 
    }));
  
    const compra: Compra = {
      nombreProveedor: this.proveedor.nombreProveedor,
      emailProveedor: this.proveedor.email,
      direccionProveedor: this.proveedor.direccion,
      productos: productosSeleccionados, // Ahora es una lista de productos
    };
  
    // Llama al servicio para crear la compra
    this.compraService.crearCompra(compra).subscribe(
      (res) => {
        this.toastr.success('La Solicitud de compra se registró con éxito!', 'Solicitud Registrada!');
        // Puedes realizar más acciones aquí si es necesario
      },
      (err) => console.error('Error al crear la compra:', err)
    );
    // Limpia la lista de productos seleccionados
    this.productosSeleccionados = [];
  }
  
  isSelected(producto: any) {
    return this.productosSeleccionados.some((p) => p.nombreProducto === producto.nombreProducto);
  }
}