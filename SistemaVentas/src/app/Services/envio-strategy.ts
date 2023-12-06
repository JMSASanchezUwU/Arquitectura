// Interface Strategy
import { CarritoService } from "./carrito.service";

export class EstrategiaEnvioContext {
  private estrategiaEnvio: EnvioStrategy;

  constructor(estrategiaEnvio: EnvioStrategy) {
    this.estrategiaEnvio = estrategiaEnvio;
  }

  cambiarEstrategia(estrategiaEnvio: EnvioStrategy): void {
    this.estrategiaEnvio = estrategiaEnvio;
  }
}

export interface EnvioStrategy {
  alertaEnvio(): void;
}


// Implementaciones concretas de la estrategia
export class PaqueteriaStrategy implements EnvioStrategy {
  tipoEnvioSeleccionadoString: any;
  constructor(
    tipoEnvioSeleccionadoString: any
  ) { this.tipoEnvioSeleccionadoString = tipoEnvioSeleccionadoString }
  alertaEnvio(): void {
    alert('Seleccionaste envío por Paquetería');
  }
} 

export class CorreoStrategy implements EnvioStrategy {
  tipoEnvioSeleccionadoString: any;
  constructor(
    tipoEnvioSeleccionadoString: any
  ) { this.tipoEnvioSeleccionadoString = tipoEnvioSeleccionadoString }
  alertaEnvio(): void {
    alert('Seleccionaste envío por Correo');
  }
}

export class ExpressStrategy implements EnvioStrategy {
  tipoEnvioSeleccionadoString: any;
  constructor(
    tipoEnvioSeleccionadoString: any
  ) { this.tipoEnvioSeleccionadoString = tipoEnvioSeleccionadoString }
  alertaEnvio(): void {
    alert('Seleccionaste envío Express');
  }
}
