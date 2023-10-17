import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compra } from 'src/app/Models/Compra';
import { CompraService } from 'src/app/Services/compra.service';
import { AutorizarService } from 'src/app/Services/autorizar.service';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent {

  solicitudes: any = [];
  comprasPorAutorizar: Compra[] = []; // Aquí almacena las compras por autorizar
  compraSeleccionada: Compra | null = null; // Aquí almacena la compra seleccionada para autorización
  comentarioNegacion: string = '';

  constructor(//private pdfService: PdfGenerationService,
    private compraService: CompraService,
    private autorizarService: AutorizarService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.getSolicitudes();
  }

  //Obtener la lista de los provedores
  getSolicitudes() {
    this.compraService.getCompras().subscribe(
      res => {
        this.solicitudes = res;
        console.log(this.solicitudes);
      },
      err => console.log(err)
    );
  }

  toggleCompra(compra: Compra) {
    if (this.compraSeleccionada === compra) {
      this.compraSeleccionada = null; // Si ya está seleccionada, oculta los detalles
    } else {
      this.compraSeleccionada = compra; // De lo contrario, muestra los detalles de la compra
    }
  }

  // Función para calcular el total de la compra
  calcularTotal(compra: Compra): number {
    return compra.productos.reduce((total, producto) => total + producto.precio, 0);
  }

  autorizarCompra(estado: string, comentario: string) {

    if (this.compraSeleccionada && this.compraSeleccionada._id) {
      this.compraSeleccionada.status = estado;
      this.compraSeleccionada.comentario = comentario;

      // Llama al servicio para editar la compra con el nuevo estado y comentario
      this.autorizarService.actualizarCompra(this.compraSeleccionada._id, this.compraSeleccionada).subscribe();
      
      if (estado === 'Autorizado') {
        this.toastr.success('Compra Autorizada');
      } else {
        this.toastr.error('Compra Denegada');
      }
    }
    this.compraSeleccionada = null; // Oculta los detalles
  }
}
