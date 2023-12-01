export interface EnvioStrategy {
    alertaEnvio(): void;
  }
  
  // Implementaciones concretas de la estrategia
  export class PaqueteriaStrategy implements EnvioStrategy {
    alertaEnvio(): void {
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
