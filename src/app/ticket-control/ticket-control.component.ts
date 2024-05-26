
import { Component, Input, OnInit, SimpleChanges, inject } from '@angular/core';
import { ApiTicketService } from '../services/api-ticket/api-ticket.service';
import { ITicket } from '../models/ticket.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ResiduoService } from '../services/api-residuo/api.serviceresiduos';
import { ResiduoModalComponent } from '../residuo-modal/residuo-modal.component';
import { Router, RouterModule } from '@angular/router';

import { TicketControlFormularioComponent } from '../ticket-control-formulario/ticket-control-formulario.component';
import { HttpErrorResponse } from '@angular/common/http';
import { PesoPipe } from 'src/assets/pipe/peso';
import { Certificado } from '../models/certificado.model';
import { ApiCertificadoService } from '../services/api-certificado/api-certificado.service';
import { Subscription, forkJoin } from 'rxjs';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { TicketControlFormularioModule } from '../ticket-control-formulario/ticket-control-formulario.module';
import { DATE_FORMATS } from '../../assets/DATE_FORMATS'; // Assuming your file is named date-formats.ts
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../module/sharedModule';
import * as FileSaver from 'file-saver';
import { DashboardComponent } from '../dashboard/dashboard.component';

/* import { Color, ScaleType } from '@swimlane/ngx-charts';
 */@Component({
  selector: 'app-ticket-control',
  standalone:true,
  templateUrl: './ticket-control.component.html',
  styleUrls: ['./ticket-control.component.css'],
  imports: [   MatTableModule,  MatPaginatorModule,  MatFormFieldModule,  MatSelectModule,  CommonModule , TicketControlFormularioModule,RouterModule ,MatCardModule,SharedModule,DashboardComponent ],
 
})

export class TicketControlComponent implements OnInit {
 
  @Input({required:true })idCertificado?: number;
  
  TicketLista: ITicket[] =[];

  displayedColumns: string[] = ['id_Ticket', 'generador', 'fechaEmisionTk','acciones'];

  mostrarFormulario: boolean = false;
isDashboard: boolean=false;
 private readonly _router= inject(Router);
/*   subscription: Subscription; */
dataSource: MatTableDataSource<ITicket>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;


 @ViewChild(TicketControlFormularioComponent) ticketControlFormularioComponent!:TicketControlFormularioComponent;
   
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  constructor( public _dialog: MatDialog, private _apiService: ApiTicketService ,private _residuoService:ResiduoService,private router: Router,private apicertificado: ApiCertificadoService ) {
    this.dataSource = new MatTableDataSource<ITicket>([]);
 
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idCertificado'] && changes['idCertificado'].currentValue !== undefined) {
      this.obtenerTicketsCertificado(changes['idCertificado'].currentValue);
    } else {
      console.error('idCertificado no está definido');
    }
}


  ngOnInit(): void {
   this._apiService.getTickets().subscribe(
    data=>{
      this.TicketLista=data
      this.dataSource=new MatTableDataSource(this.TicketLista)
    }
   )
  }
  changePageSize(event: any) {
    this.paginator.pageSize = event.value;
    // Puedes realizar otras acciones relacionadas con el cambio del tamaño de la página si es necesario.
  }



/*   obtenerTicketsCertificado(id:number): void {
    this.apicertificado.getfindCertificado(id).subscribe(
      (certificado: Certificado) => {
  
        const observables = certificado.listaTicketsDTO.map(element => {
          return this._apiService.getTicketById(element);
        });
  
        console.log(observables.length)
        // Combinar todas las llamadas en una sola y suscribirse
        if(observables.length!=0){
          forkJoin(observables).subscribe(
          (tickets: ITicket[]) => {
            console.log(tickets); // Imprime el arreglo de tickets
            this.dataSource.data = tickets.length === 0 ? [] : tickets;
          },
          error => {
            console.error('Error obteniendo tickets:', error);
          }
        )}else{
          this.dataSource.data=[];
          console.log(this.dataSource.data)
        }
        ;
      },
      error => {
        console.error('Error obteniendo certificado:', error);
      }
    );
  } */

  obtenerTicketsCertificado(id: number): void {
    this.apicertificado.getfindCertificado(id).subscribe(
        (certificado: Certificado) => {
            // Verificar si listaTicketsDTO está definido y no es null
            if (certificado.listaTicketsDTO && certificado.listaTicketsDTO.length > 0) {
                const observables = certificado.listaTicketsDTO.map(element => {
                    return this._apiService.getTicketById(element);
                });

                console.log(observables.length);

                // Combinar todas las llamadas en una sola y suscribirse
                forkJoin(observables).subscribe(
                    (tickets: ITicket[]) => {
                        console.log(tickets); // Imprime el arreglo de tickets
                        this.dataSource.data = tickets.length === 0 ? [] : tickets;
                    },
                    error => {
                        console.error('Error obteniendo tickets:', error);
                    }
                );
            } else {
                this.dataSource.data = [];
                console.log(this.dataSource.data);
            }
        },
        error => {
            console.error('Error obteniendo certificado:', error);
        }
    );
}


  async eliminarRegistro(id_Ticket:number) {
    const confirmacion = confirm('¿Desea Eliminar El Ticket con el ID ' + id_Ticket + '?');

    if (confirmacion) {
      try {
        const response: any = await this._apiService.eliminarTicket(id_Ticket).toPromise();
  
        if (response && response.includes('Ticket eliminado correctamente')) {
          // La respuesta es válida y contiene el resultado esperado
          alert('Mensaje del Servidor: ' + response);
          this.actualizarListaTickets();
        } else {
          // La respuesta no tiene el formato esperado
          console.error('Respuesta inesperada del servidor:', response);
          alert('Error al eliminar el Ticket. Respuesta inesperada del servidor.');
        }
      } catch (error) {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // La respuesta es un 200 OK, manejamos la respuesta como texto
          alert('Mensaje del Servidor: ' + error.error);
          this.actualizarListaTickets();
        } else {
          // Otro tipo de error
          console.error('Error al eliminar el Ticket:', error);
  
          // Muestra un mensaje de error al usuario
          alert('Error al eliminar el Ticket. Por favor, inténtalo nuevamente.');
        }
  }
}
}
  private actualizarListaTickets() {
    // Llama al servicio para obtener la lista actualizada de tickets
    this._apiService.getTickets().subscribe(
      tickets => {
        this.dataSource.data = tickets;
      },
      error => {
        console.error('Error al obtener la lista de tickets:', error);
      }
    );
  }
  editarTicket(ticket: ITicket): void {
    // Navegar al formulario con el ID del ticket como parámetro
   /*  this.router.navigate(['/formulario-ticket', ticket.id_Ticket]); */
    console.log(ticket)
    /* this.router.navigateByUrl("/ticket-control_Formulario") */
  }
  navegarAFormulario() {
    this.router.navigate(['/formulario-ticket']);  // Reemplaza con la ruta real de tu formulario
  }

  imprimirPDF(id: number): void {
    this._apiService.getReporteTicketById(id)
      .subscribe(
        response => {
          console.log(response.downloadUrl);
          if (typeof response === 'object' && response.downloadUrl) {
            const nombreArchivo = `ticket-${id}.pdf`; // Definir nombre del archivo
  
            // Convertir datos de respuesta a Blob (si es necesario)
            const blob = response.data instanceof Blob ? response.data : new Blob([response], { type: 'application/pdf' });

  
            FileSaver.saveAs(blob, nombreArchivo); // Descargar PDF
  
            // Mensaje informativo (opcional)
            alert('El archivo PDF se ha descargado correctamente.');
          } else {
            console.error('Formato de respuesta inesperada:', response);
          }
        },
        error => {
          console.error('Error al generar PDF:', error);
        }
      );

           /* this._apiService.getReporteTicketById(id)
    .subscribe(
        response => {
            // Comprobar el tipo de respuesta
            if (typeof response === 'object') {
                console.log('Generación de PDF exitosa:', response.message);
                // Manejar la descarga del PDF basándose en la respuesta del servidor (por ejemplo, extraer la URL de descarga)
            } else {
                console.error('Formato de respuesta inesperada:', response);
            }
        },
        error => {
            console.error('Error al generar PDF:', error);
        }
*/
        
}

}

