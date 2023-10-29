import { CarritoComponent } from './Components/carrito/carrito.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizarComponent } from './Components/autorizar/autorizar.component';
import { CompraComponent } from './Components/compra/compra.component';
import { SolicitudComponent } from './Components/solicitud/solicitud.component';
import { SeguimientoComponent } from './Components/seguimiento/seguimiento.component';
import { ProductoComponent } from './Components/producto/producto.component';


const routes: Routes = [
  {path: 'autorizar', component:AutorizarComponent},
  {path: 'compra', component: CompraComponent},
  {path: 'solicitud', component: SolicitudComponent},
  {path: 'seguimiento', component: SeguimientoComponent},
  {path: '**', redirectTo:'', pathMatch: 'full'},
  {path: 'carrito', component: CarritoComponent},
  {path: 'producto', component: ProductoComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
