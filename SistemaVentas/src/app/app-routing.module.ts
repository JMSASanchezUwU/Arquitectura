import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutorizarComponent } from './Components/autorizar/autorizar.component';
import { CompraComponent } from './Components/compra/compra.component';
import { SolicitudComponent } from './Components/solicitud/solicitud.component';
import { SeguimientoComponent } from './Components/seguimiento/seguimiento.component';


const routes: Routes = [
  {path: 'autorizar', component:AutorizarComponent},
  {path: 'compra', component: CompraComponent},
  {path: 'solicitud', component: SolicitudComponent},
  {path: 'seguimiento', component: SeguimientoComponent},
  {path: '**', redirectTo:'', pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
