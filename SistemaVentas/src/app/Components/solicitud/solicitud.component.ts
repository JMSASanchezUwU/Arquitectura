import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CompraService } from 'src/app/Services/compra.service';
import { SolicitudService } from 'src/app/Services/solicitud.service';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styleUrls: ['./solicitud.component.css']
})
export class SolicitudComponent {

  urlCompra = 'http://localhost:4000/api/Compra/';

  solicitudes: any = [];
  constructor(private solicitudService: SolicitudService, 
              private toastr: ToastrService, 
              private router: Router) {
    
  }
  
  ngOnInit() {
    this.getSolicitudes();
  }    
    //Obtener la lista de los provedores
    getSolicitudes() {
      this.solicitudService.listarCompras().subscribe(
        res => {
          this.solicitudes = res;
        },
        err => console.log(err)
      );
    }
}
