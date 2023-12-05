// Interface Strategy
import { CarritoService } from "./carrito.service";


export interface EnvioStrategy {
  alertaEnvio(): void;
}


// Implementaciones concretas de la estrategia
export class PaqueteriaStrategy implements EnvioStrategy {
  constructor(
    private carritoService: CarritoService,
// Agrega ActivatedRoute para acceder a los parámetros de la URL
  ) { }
  alertaEnvio(): void {
  this.carritoService.actualizarCompra;
    alert('Seleccionaste envío por Paquetería');
  }
}

export class CorreoStrategy implements EnvioStrategy {
  alertaEnvio(): void {
    alert('Seleccionaste envío por Correo');
  }
}

export class ExpressStrategy implements EnvioStrategy {
  alertaEnvio(): void {
    alert('Seleccionaste envío Express');
  }
}
