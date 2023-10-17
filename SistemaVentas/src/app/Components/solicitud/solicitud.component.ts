import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compra } from 'src/app/Models/Compra';
import { CompraService } from 'src/app/Services/compra.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {

  solicitudes: any = [];
  constructor(private compraService: CompraService, private toastr: ToastrService, private router: Router) {
    
  }
  
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
}
