import { Component } from '@angular/core';
import { Compra } from '../../Models/Compra';
//import { PdfGenerationService } from '../../Services/generar-pdf.service';
import { CompraService } from 'src/app/Services/compra.service';


@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent {

  productosSeleccionados: any[] = [];
  proveedores: any = [];
  productos: any = [];

  constructor(//private pdfService: PdfGenerationService,
    private compraService: CompraService) { }

  ngOnInit() {
    this.getProveedores();
  }

  getProveedores() {
    this.compraService.getProveedores().subscribe(
      res => {
        this.proveedores = res;
        console.log(this.proveedores);
      },
      err => console.log(err)
    );
  }

  getProductos(nombreProveedor: string) {
    this.compraService.getProductos(nombreProveedor).subscribe(
      res => {
        this.productos = res;
      },
      err => console.log(err)
    );
  }

  seleccionarProveedor(event: Event) {
    const nombreProveedor = (event.target as HTMLSelectElement).value; // Obtenemos el valor seleccionado

    if (nombreProveedor) {
      this.getProductos(nombreProveedor);
    }
  }

  seleccionarProducto(producto: any) {
    const index = this.productosSeleccionados.findIndex((p) => p.nombreProducto === producto.nombreProducto);

    if (index !== -1) {
      // El producto ya está seleccionado, así que lo deseleccionamos
      this.productosSeleccionados.splice(index, 1);
    } else {
      // El producto no está seleccionado, lo añadimos a la lista de productos seleccionados
      this.productosSeleccionados.push(producto);
    }
  }

  realizarCompra() {
    if (this.productosSeleccionados.length === 0) {
      // No hay productos seleccionados, puedes mostrar un mensaje de error o realizar una acción adecuada
      return;
    }
  
    // Construye la compra con los productos seleccionados
    const compra: Compra = {
      nombreProveedor: 'Proveedor de prueba', // Puedes ajustar esto según tus necesidades
      emailProveedor: 'correo@proveedor.com', // Ajusta esto según tu lógica
      direccionProveedor: 'Dirección de prueba', // Ajusta esto según tu lógica
      fechaCompra: new Date().toLocaleString(), // Fecha actual
      status: 'En Proceso',
      comentario: 'Comentario de prueba', // Puedes ajustar esto
      productos: this.productosSeleccionados.map((producto) => ({
        nombreProducto: producto.nombreProducto,
        precio: producto.precio,
        img: producto.img,
      })),
    };
  
    // Llama al servicio para crear la compra
    this.compraService.crearCompra(compra).subscribe(
      (res) => {
        console.log('Compra creada:', res);
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
