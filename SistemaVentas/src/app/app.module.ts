import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';


import { SolicitudComponent } from './Components/solicitud/solicitud.component';
import { AutorizarComponent } from './Components/autorizar/autorizar.component';
import { CompraComponent } from './Components/compra/compra.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SeguimientoComponent } from './Components/seguimiento/seguimiento.component';
import { CarritoComponent } from './Components/carrito/carrito.component';

import { RealizarPagoComponent } from './Components/realizar-pago/realizar-pago.component';
import { NotificacionComponent } from './Components/notificacion/notificacion.component';


@NgModule({
  declarations: [
    AppComponent,
    SolicitudComponent,
    AutorizarComponent,
    CompraComponent,
    SeguimientoComponent,
    CarritoComponent,
    ProductoComponent,
    RealizarPagoComponent,
    NotificacionComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule { }
