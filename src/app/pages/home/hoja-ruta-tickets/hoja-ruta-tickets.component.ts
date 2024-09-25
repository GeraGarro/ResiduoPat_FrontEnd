import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ITicket } from '../../../models/ticket.model';
import { ApiTicketService } from '../../../services/api-ticket/api-ticket.service';


@Component({
  selector: 'app-hoja-ruta-tickets',
  standalone:true,
  imports:[ MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
MatSlideToggleModule,
FormsModule, RouterModule,
RouterLink,
],
  templateUrl: './hoja-ruta-tickets.component.html',
  styleUrls: ['./hoja-ruta-tickets.component.css']
})
export class HojaRutaTicketsComponent {
listaTickets:ITicket []=[];
columnas: string[]=['id','fecha','estado'];
dataSource:MatTableDataSource<ITicket>;

private readonly apiTicket= inject(ApiTicketService);

 primerDia:Date;

 ultimoDia:Date;

 @Output() contadorTicket=new EventEmitter<{contador: number}>();
 @Output() contadorTicketWarning=new EventEmitter<{contador: number}>();
constructor(private router: Router){
  const hoy = new Date(); // Obtener la fecha actual
  const [firstDayOfWeek, lastDayOfWeek] = this.getPrimerYUltimoDiaDeLaSemana(hoy); 
  console.log("Primer día de la semana:", firstDayOfWeek);
  this.primerDia=firstDayOfWeek;
  console.log("Último día de la semana:", lastDayOfWeek.toLocaleDateString());
  this.ultimoDia=lastDayOfWeek;
  this.dataSource = new MatTableDataSource<ITicket>([]);
  
}

ngOnInit(): void {
this.apiTicket.getTickets().subscribe(
  (data)=>{
    console.log(data)
  this.listaTickets=data
  this.dataSource=new MatTableDataSource(this.listaTickets);
  this.contadorTicket.emit({contador: this.listaTickets.length})
  
  this.contadorTicketWarning.emit({contador: this.ticketsWarning(this.listaTickets).length})
   } )



}

ticketsWarning(lista:ITicket[]){
 const nuevaLista : ITicket[]=[]
lista.forEach(element => {
  if(!element.estado){
    nuevaLista.push(element)
  }
});
return nuevaLista;
}



onRowClicked(row: any): void {
  this.router.navigate(['/ticket-info'], { queryParams: { id: row.id_Ticket } });
}
//calcular el primer y Ultimo Dia de la Semana


 getPrimerYUltimoDiaDeLaSemana(date: Date): [Date, Date] {
  const firstDayOfWeek = new Date(date);
  const lastDayOfWeek = new Date(date);
  
  // Establecer el primer día de la semana como domingo (0)
  firstDayOfWeek.setDate(date.getDate() - date.getDay());

  // Establecer el último día de la semana como sábado (6)
  lastDayOfWeek.setDate(date.getDate() + (6 - date.getDay()));

  return [firstDayOfWeek, lastDayOfWeek];
}



}


