import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizarComponent } from './Components/autorizar/autorizar.component';
import { CompraComponent } from './Components/compra/compra.component';
import { SolicitudComponent } from './Components/solicitud/solicitud.component';
import { SeguimientoComponent } from './Components/seguimiento/seguimiento.component';
import { ProductoComponent } from './Components/producto/producto.component';
import { CarritoComponent } from './Components/carrito/carrito.component';
//import { PagoComponent } from './Components/pago/pago.component';
import { NotificacionComponent } from './Components/notificacion/notificacion.component';
import { HomeComponent } from './home/home.component';




const routes: Routes = [
  {path: '', redirectTo: 'inicio', pathMatch: 'full'}, // Redirecciona a HomeComponent cuando esté vacío
  {path: 'inicio', component:HomeComponent},
  {path: 'autorizar', component:AutorizarComponent},
  {path: 'compra', component: CompraComponent},
  {path: 'solicitud', component: SolicitudComponent},
  {path: 'seguimiento', component: SeguimientoComponent},
  {path: 'carrito', component: CarritoComponent},
  {path: 'producto', component: ProductoComponent},
  {path: 'notificacion', component: NotificacionComponent},
  //{path: 'pago', component: PagoComponent},
  {path: '**', redirectTo:'inicio', pathMatch: 'full'},


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
