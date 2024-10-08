import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ITicket, ListaResiduo } from 'src/app/models/ticket.model';
import { ResiduoComponent } from 'src/app/residuo/residuo.component';
import { ApiTicketService } from 'src/app/services/api-ticket/api-ticket.service';




@Component({
  selector: 'app-ticket-info',
  templateUrl: './ticket-info.component.html',
  styleUrls: ['./ticket-info.component.css'],
  standalone:true,
  imports:[CommonModule,ResiduoComponent, FormsModule  ]
})
export class TicketInfoComponent {
contador?:string;
private readonly _activatedRouter = inject(ActivatedRoute);

 idTicket?: number;
private apiIticket=inject(ApiTicketService);

 operadorRetiro?: string;
 idOperador?: number;

  generador?: string;
  idGenerador?: number;
  fecha: string | undefined;

  listaResiduos?: ListaResiduo [] = [];

ngOnInit(): void {
  this.getIdTicket();
}

getIdTicket(){
  this._activatedRouter.queryParamMap.subscribe((params) => {
    const id= params.get("id");
    
    let ticket: ITicket;
     if(id !== null){
    
       this.idTicket= +id;
       this.apiIticket.getTicketById(this.idTicket).subscribe((data)=>{
      /*   console.log(data) */
      this.contador=data.codigo;
        this.operadorRetiro=data.transportista.nombre+" "+data.transportista.apellido ;

        this.idOperador=data.transportista.id_transportista;

        this.generador=data.generador.nombre;
        this.idGenerador=data.generador.id;

       

        this.listaResiduos=data.listaResiduos || [];

         for(let i=0;i< this.listaResiduos.length; i++){
          const residuo= this.listaResiduos[i]
       
         }
    
        },error=>{
          console.error("Ha ocurrido un error")
        }
      
   /*      this.fecha = new Date(data.fechaEmisionTk);  */
       
      );

  }});
}


onDateChange(event: Event) {
  const target = event.target as HTMLInputElement; // Aseguramos que el target es un input
  if (target) {
    this.fecha = target.value; // target.value debería ser 'yyyy-MM-dd'
  }
}
}
