import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Compra } from 'src/app/Models/Compra';
import { AutorizarService } from 'src/app/Services/autorizar.service';
import { FormGroup, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-autorizar',
  templateUrl: './autorizar.component.html',
  styleUrls: ['./autorizar.component.css']
})
export class AutorizarComponent {

  solicitudes: any = [];
  comprasPorAutorizar: Compra[] = [];
  compraSeleccionada: Compra | null = null;
  comentarioNegacion: string = ''
  compraForm: FormGroup;
  modalAction: 'Autorizar' | 'Denegar' | null = null;


  constructor(
    private fb: FormBuilder,
    private autorizarService: AutorizarService,
    private toastr: ToastrService,
    private router: Router) {
    this.compraForm = this.fb.group({
      comentario: [''],
    });
  }

  ngOnInit() {
    this.getSolicitudesFiltro();
  }

  //Obtener la lista de los provedores
  async getSolicitudesFiltro() {
    try {
      const res = await this.autorizarService.getComprasFiltro().toPromise();
      this.solicitudes = res;
      console.log(this.solicitudes);
    } catch (err) {
      console.log(err);
    }
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

  reiniciarFormulario() {
    this.compraForm.get('comentario')?.setValue('');
  }

  // En tu componente
  reiniciarFormularioYDenegar() {
    this.autorizarCompra('Denegado');
    this.reiniciarFormulario();
  }

  // En tu componente
  reiniciarFormularioYAutorizar() {
    this.autorizarCompra('Autorizado');
    this.reiniciarFormulario();
  }


  autorizarCompra(estado: string) {
    if (this.compraSeleccionada && this.compraSeleccionada._id) {
      this.compraSeleccionada.status = estado;
      this.compraSeleccionada.comentario = this.compraForm.get('comentario')?.value;

      // Llama al servicio para editar la compra con el nuevo estado y comentario
      this.autorizarService.actualizarCompra(this.compraSeleccionada._id, this.compraSeleccionada).subscribe(() => {
        if (estado === 'Autorizado') {
          this.toastr.success('Compra Autorizada');
        } else {
          this.toastr.error('Compra Denegada');
        }
        this.getSolicitudesFiltro();
      });
    }
    this.compraSeleccionada = null; // Oculta los detalles
  }
}
