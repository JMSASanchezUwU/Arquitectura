import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compra } from 'src/app/Models/Compra';
import { CompraService } from 'src/app/Services/compra.service';

@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent {

  solicitudes: any = [];
  comprasPorAutorizar: Compra[] = []; // Aquí almacena las compras por autorizar
  compraSeleccionada: Compra | null = null; // Aquí almacena la compra seleccionada para autorización

  constructor(//private pdfService: PdfGenerationService,
  private compraService: CompraService,
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
    
    autorizarCompra(status:string) {
      if (status == "Autorizado") {
        this.toastr.success('Compra autorizada');
      } else {
        this.toastr.error('Compra denegada');
      }
      
      this.compraSeleccionada = null; // Oculta los detalles
    }
    
    // Función para calcular el total de la compra
    calcularTotal(compra: Compra): number {
      return compra.productos.reduce((total, producto) => total + producto.precio, 0);
    }
}
