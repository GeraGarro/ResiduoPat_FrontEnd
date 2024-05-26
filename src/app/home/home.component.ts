import { Component, Input } from '@angular/core';
import { HojaRutaTicketsComponent } from '../hoja-ruta-tickets/hoja-ruta-tickets.component';
import { GeneradorComponent } from '../generador/generador.component';
import { TipoResiduoComponent } from '../tipo-residuo/tipo-residuo.component';
import { TicketControlComponent } from '../ticket-control/ticket-control.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    TipoResiduoComponent,
    GeneradorComponent,
    HojaRutaTicketsComponent,
    TicketControlComponent,
    DashboardComponent,
    CommonModule,
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
