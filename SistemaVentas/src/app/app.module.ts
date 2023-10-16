import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompraComponent } from './Components/compra/compra.component';
import { SolicitudComponent } from './Components/solicitud/solicitud.component';
import { AutorizarComponent } from './Components/autorizar/autorizar.component';

@NgModule({
  declarations: [
    AppComponent,
    CompraComponent,
    SolicitudComponent,
    AutorizarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
