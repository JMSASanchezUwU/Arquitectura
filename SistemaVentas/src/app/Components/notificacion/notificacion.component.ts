import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  notificaciones: string[] = [];

  // Métodos para mostrar notificaciones, por ejemplo:
  mostrarNotificaciones(message: string) {
    this.notificaciones.push(message);
  }

  limpiarNotificaciones() {
    this.notificaciones = [];
  }

  constructor() { }

  ngOnInit(): void {
  }
}

