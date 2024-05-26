import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup ,FormsModule,ReactiveFormsModule,Validators} from '@angular/forms';
import { ApiGeneradorService } from '../services/api-generador/api-generador.service';
import { Generador } from '../models/generador.model';
import { FormControl } from '@angular/forms';
import { ApiTicketService } from '../services/api-ticket/api-ticket.service';
import{ActivatedRoute }from '@angular/router'
import { ITicket, Transportista } from '../models/ticket.model';
import { ApiTransportistaService } from '../services/api-transportista/api-transportista.service';

@Component({
  selector: 'app-ticket-control-formulario',
  templateUrl: './ticket-control-formulario.component.html',
  
  styleUrls: ['./ticket-control-formulario.component.css']
})
export class TicketControlFormularioComponent implements OnInit {

formularioTicket:FormGroup;
ahora: Date | undefined; // Almacena la fecha actual como objeto Date

deshabilitar:any;

tuFormControl = new FormControl();

position = 'below';

idTicket: number | undefined;

findFechaEmision?:String;

/* @Input() rowData: any; */

titulo:string;

generadores: Generador[] = [];

listaTransportistas:Transportista[]=[];
selectTransportistaId?: number|null;
 isSelectTransportista: boolean=false;
@ViewChild('picker') picker: any; // Obtiene referencia al datepicker


constructor(private form:FormBuilder,private Api_transpoortista: ApiTransportistaService, private apiGenerador: ApiGeneradorService,private apiTicket: ApiTicketService,private route: ActivatedRoute,){
  this.formularioTicket=this.form.group({
    transportista:['',Validators.required],
    generador:['',Validators.required],
    
  })

  this.selectTransportistaId = 0;
  setTimeout(() => {
    this.selectTransportistaId = null; // Variable temporal o valor nulo
  }, 0);

this.titulo="";

}


ngOnInit(): void {
  
  this.idTicket = Number(this.route.snapshot.paramMap.get('id'));

  if (this.idTicket) {
    // Si hay un ID, cargar los datos del ticket
    this.cargarDatosDelTicket();
    this.titulo="Editar Ticket "+this.idTicket
  } else {
    // Cargar generadores en caso de creación de un nuevo ticket
    this.cargarGeneradores();
  
    
  }
 
  this.Api_transpoortista.getTransportistas().subscribe(
    (data) => {
      console.log(data);
      this.listaTransportistas = data;
    },
    (error) => {
      console.error('Error fetching Transportista:', error);
    }
  );
  this.isSelectTransportista; 


  this.ahora = new Date(); // Crea un nuevo objeto Date que representa hoy
  this.picker._datepickerRef.setValue(this.ahora); // Establece el valor del datepicker

}


cargarGeneradores(): void{
this.apiGenerador.getGeneradores().subscribe(
  (data:Generador[])=>{
    this.generadores=data;
    
  },
    error => {
      console.error('Error al obtener generadores', error);
    }
  );
}



cargarDatosDelTicket(): void {
  // Hacer una solicitud HTTP al servicio para obtener los detalles del ticket con el ID proporcionado
  this.apiTicket.getTicketById(this.idTicket!).subscribe(
    (ticket: ITicket) => {
      console.log("ticket datos:", ticket);
    
      // Llenar el formulario con los datos obtenidos del ticket
      this.formularioTicket.patchValue({
        transportista: ticket.transportista.nombre,
        generador: ticket.generador.id,
        // Completa aquí con los demás campos del formulario según tus necesidades
      });
    },
    error => {
      console.error('Error al obtener detalles del ticket', error);
    }
  );
}
onSelectTransportista(transportistaId: number):void{

  this.selectTransportistaId=transportistaId;
  
  this.isSelectTransportista=true;

}

hasErrors(controlNombre : string, errorType: string){
  return this.formularioTicket.get(controlNombre)?.hasError(errorType) &&
      this.formularioTicket.get(controlNombre)?.touched
  }

  enviar(){
    console.log(this.formularioTicket);
    }
mostrarHijo=false;

toggleResiduo(){
  
  console.log('Cambiando mostrarHijo a ', !this.mostrarHijo);
  this.mostrarHijo=!this.mostrarHijo;
}
}
