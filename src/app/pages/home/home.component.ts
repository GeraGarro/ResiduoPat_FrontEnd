import { Component, Input } from '@angular/core';

import { HojaRutaTicketsComponent } from 'src/app/pages/home/hoja-ruta-tickets/hoja-ruta-tickets.component';

import { GeneradorComponent } from 'src/app/pages/home/generador/generador.component';
import { TipoResiduoComponent } from 'src/app/pages/home/tipo-residuo/tipo-residuo.component';
import { TicketControlComponent } from 'src/app/ticket-control/ticket-control.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToggleVisibilityDirective } from 'src/app/directivas/toggle-visibility.directive';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    TipoResiduoComponent,
    GeneradorComponent,
    HojaRutaTicketsComponent,
    TicketControlComponent,
    DashboardComponent,
    CommonModule,
RouterModule,
ToggleVisibilityDirective
  ],
  
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  estiloDashboardGenerador = {
    background: '#AF1EDD',
  };

  estiloDashboardTipo = {
    background: '#F19D00',
  };

  urlReport: string = '../../assets/icons/report.png';
  urlGenerador: string = '../../assets/icons/hospital.png';
  urlReportWarning: string = '../../assets/icons/ticketWarning.png';

  _contador?: number;
  _contadorTicket?:number;
  _contadorTicketWarning?:number;
  @Input()
  recepcionDato(valor: number) {
    this._contador = valor;
    console.log(this._contador);
  }

  @Input()
  receptorContadorTicket(valor: number){
    this._contadorTicket=valor;
  }

  @Input()
  receptorContadorTicketWarning(valor: number){
    this._contadorTicketWarning=valor
  }
  constructor() {}

  ngOnInit(): void {}
}
