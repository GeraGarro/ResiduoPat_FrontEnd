import { Component, Input, ViewChild } from '@angular/core';
import { HojaRutaTicketsComponent } from 'src/app/pages/home/hoja-ruta-tickets/hoja-ruta-tickets.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TicketControlFormularioComponent } from './ticket-control-formulario/ticket-control-formulario.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    HojaRutaTicketsComponent,
    DashboardComponent,
    CommonModule,
RouterModule,
TicketControlFormularioComponent
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

  @ViewChild('hojaRutaTickets') hojaRutaTickets!: HojaRutaTicketsComponent;

  onTicketCreado(): void {
    this.hojaRutaTickets.recargarTickets(); 
  }
}
