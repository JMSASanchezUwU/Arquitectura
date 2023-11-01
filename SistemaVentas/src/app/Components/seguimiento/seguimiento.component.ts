import { Component } from '@angular/core';
import { SeguimientoService } from 'src/app/Services/seguimiento.service';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.component.html',
  styleUrls: ['./seguimiento.component.css']
})
export class SeguimientoComponent {
  ventas: any = [];

  constructor(//private pdfService: PdfGenerationService,
    private seguimientoService: SeguimientoService,) {   } 

    ngOnInit() {
      this.getVentas();
    }

  getVentas() {
    this.seguimientoService.getVentas().subscribe(
      res => {
        this.ventas = res;
        console.log(this.ventas)
        
      },
      err => console.log(err)
    );
  }

}
