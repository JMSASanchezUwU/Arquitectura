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

  proveedores: any = [];

  constructor(//private pdfService: PdfGenerationService,
    private compraService: CompraService) { }

  ngOnInit() {
   // this.getProveedores();
  }

  getProveedores() {
    this.compraService.getProveedores().subscribe(
      res => {
        this.proveedores = res;
      },
      err => console.log(err)
    );
  }

  getProductos( nombreProveedor : string) {
    this.compraService.getProductos(nombreProveedor).subscribe(
      res => {
        this.proveedores = res;
      },
      err => console.log(err)
    );
  }

}
