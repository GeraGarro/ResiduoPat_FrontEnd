import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiGeneradorService } from '../../services/api-generador/api-generador.service';

import { ApiTicketService } from '../../services/api-ticket/api-ticket.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Transportista, ITicket,Generador } from '../../models/ticket.model';
import { ApiTransportistaService } from '../../services/api-transportista/api-transportista.service';
import { MatDatepicker } from '@angular/material/datepicker';
import { CommonModule, DatePipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ModalComponent } from 'src/app/modal/modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-ticket-control-formulario',
  templateUrl: './ticket-control-formulario.component.html',
  styleUrls: ['./ticket-control-formulario.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    RouterModule,
    MatCardModule,
    MatDatepickerModule,
    MatInputModule,
    MatIconModule,
    ModalComponent,
    MatSlideToggleModule
  ],
  providers: [DatePipe]
})
export class TicketControlFormularioComponent implements OnInit {
  formularioTicket: FormGroup;
  estadoEdicion: boolean = false;
  idTicket: number | undefined;
  titulo?: string;
 

  generadores: Generador[] = [];
  listaTransportistas: Transportista[] = [];
  listaGeneradores: Generador []=[];
  
  selectedTransportistaName = ''; // Para mostrar el nombre en el input
  
  selectTransportistaId: number | null = null; 
  selectGeneradorId: number | null=null;
 
  selectedTransportista = '';
  
  mensajeModal:string='';

  modal:boolean=false;

  accionAceptada:boolean=false;
  toggleModal(state: boolean) {
    this.modal = state;
  }

  private readonly router=inject(Router);
  private previousModalState: boolean = this.modal;

  constructor(
    private datePipe: DatePipe,
    private formBuilder: FormBuilder,
    private apiTransportistaService: ApiTransportistaService,
    private apiGeneradorService: ApiGeneradorService,
    private apiTicketService: ApiTicketService,
    private route: ActivatedRoute
  ) {
    this.formularioTicket = this.formBuilder.group({
      transportista: [null, Validators.required],
      generador: [null, Validators.required],
      fechaRetiro: ['', Validators.required],
      estadoRevision: [false],
    });
  }

  ngOnInit(): void {
    this.idTicket = Number(this.route.snapshot.paramMap.get('id'));

   const ahora = new Date(); // Crea un nuevo objeto Date que representa hoy

    this.formularioTicket.patchValue({
      fechaRetiro: ahora
    });

    if (this.idTicket) {
      this.cargarDatosDelTicket();
      this.titulo = 'Editar Ticket ' + this.idTicket;
    } else {
      this.cargarGeneradores();
    }

    this.apiTransportistaService.getTransportistas().subscribe(
      (data) => {
        console.log('Transportistas cargados:', data); 
        this.listaTransportistas = data;
        // Inicializa las opciones filtradas
      },
      (error) => {
        console.error('Error al seleccionar Transportista:', error);
      }
    );

this.cargarGeneradores()

  
  }

  ngDoCheck(): void {
    if (this.previousModalState !== this.modal) {
      this.previousModalState = this.modal;
      if (!this.modal && this.accionAceptada) {
       setTimeout(()=>{
        this.router.navigate(['/residuo']);
       },2000)
       
       
      }
    }
  }


  cargarGeneradores(): void {
    this.apiGeneradorService.getGeneradores().subscribe(
      (data) => {
        this.listaGeneradores = data;
      },
      (error) => {
        console.error('Error al obtener generadores', error);
      }
    );
  }


  cargarDatosDelTicket(): void {
    this.apiTicketService.getTicketById(this.idTicket!).subscribe(
      (ticket: ITicket) => {
        this.formularioTicket.patchValue({
          transportista: ticket.transportista.id_transportista,
          generador: ticket.generador.id,
          fechaGeneracion: ticket.fechaEmisionTk,
          estadoTicket: ticket.estado,
        });
      },
      (error) => {
        console.error('Error al obtener detalles del ticket', error);
      }
    );
  }

  onSelectTransportista(transportistaId: number): void {
    this.selectTransportistaId = transportistaId;
    console.log('Transportista seleccionado:', this.selectTransportistaId);
  }
  onSelectGenerador(generadorId: number):void{
    this.selectGeneradorId= generadorId;
    console.log('Generador seleccionado:', this.selectGeneradorId);

  }

  onDateChange(event: any): void {
    const fechaSeleccionada = event.value;
    console.log('Fecha seleccionada:', fechaSeleccionada);
  }

  hablitarEdicion():void{

  }
  onSubmit(){
   
     const id_transp=this.selectTransportistaId;
     const id_generador=this.selectGeneradorId;
     
     const fechaRetiro = this.datePipe.transform(this.formularioTicket.value.fechaRetiro, 'yyyy-MM-dd');
      let estadoRevision=false;
     console.log('Transportista:', id_transp);
     console.log('Generador:', id_generador);
     console.log('Fecha de Retiro:', fechaRetiro);
    
     if(this.estadoEdicion){
      console.log()
     }
     else
     { 
      let transportista: Transportista={
        id_transportista: id_transp ?? 0
      };
     
      

      let generador: Generador={
        id: id_generador ?? 0
      };

      if (id_transp == null || id_generador == null) {
        this.modal = true;
        this.mensajeModal = 'Debe seleccionar un transportista y un generador';
        this.accionAceptada = false; // Acción rechazada
        return;
      }

      let nuevoTicket: ITicket=
      {
        transportista: transportista,
        generador: generador,
        fechaEmisionTk: fechaRetiro ? new Date(fechaRetiro) : null,
        estado: false,

      }

      this.apiTicketService.addTicket(nuevoTicket).subscribe(
        response =>{
          console.log(response)
          this.modal=true;
          this.mensajeModal=response['message'];
          this.accionAceptada=true;
        },
        error =>{
          console.error("Error al generar Ticket", error);
          this.mostrarError(error);
          this.modal=true;
        }
      ) 
     }
  }

  mostrarError(error: HttpErrorResponse) {
    if (error.error && error.error.message) {
       this.mensajeModal = error.error.message; 
    } else {
     this.mensajeModal = 'Ocurrió un error inesperado'; 
    }
  }
}