import {
  ChangeDetectorRef,
  Component,
  Inject,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { Certificado } from '../models/certificado.model';
import { ApiCertificadoService } from '../services/api-certificado/api-certificado.service';
import { CommonModule } from '@angular/common';
import { TicketControlComponent } from '../ticket-control/ticket-control.component';
import { desplegableCustom } from '../directivas/desplegable';
import { ApiTransportistaService } from '../services/api-transportista/api-transportista.service';
import { Transportista } from '../models/certificado.model';
import { FormsModule } from '@angular/forms';
import { forkJoin, switchMap } from 'rxjs';




@Component({
  selector: 'app-certificado',
  standalone: true,
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css'],
  imports: [
    TicketControlComponent,
    CommonModule,
    desplegableCustom,
    FormsModule,
  ],
})
export class CertificadoComponent implements OnInit {

  listaCertificados: Certificado[] = [];
  listaTransportistas: Transportista[] = [];
  selectTransportistaId?: number | null;
  isSelectTransportista: boolean = false;
  selectedCertificadoId?: number;
  private serviceApi = Inject(ApiCertificadoService);

    constructor(
      private apiCertificado: ApiCertificadoService,
      private apiTransportista: ApiTransportistaService,
      private cd: ChangeDetectorRef
    ) {
      this.selectTransportistaId = null;
      setTimeout(() => {
        this.selectTransportistaId = null; // Variable temporal o valor nulo
      }, 0);
    }


    /* Inicializamos El componente con la carga de los Transportista Existentes */
    ngOnInit(): void {

      this.apiTransportista.getTransportistas().subscribe(
        (data) => {
         
          this.listaTransportistas = data;
        },
        (error) => {
          console.error('Error fetching Transportista:', error);
        }
      );

      this.cargarCertificadosbyTransportista(this.selectTransportistaId);
      this.isSelectTransportista;
    }


    ngOnChanges(changes: SimpleChanges): void {
     
    }

  onSelectTransportista(transportistaId: number): void {
    this.isSelectTransportista = true;
    this.cargarCertificadosbyTransportista(transportistaId);
  }
/* Metodo en el cual o */
  onSelectCertificado(certificadoId: number): void {
    this.selectedCertificadoId = certificadoId;
  }


/*   cargarCertificadosbyTransportista(transportistaId: number | null | undefined): void {
    if(!transportistaId){
      this.listaCertificados=[];
      return;
    }
    this.listaCertificados=[];
    this.apiCertificado.getFindCertificadosByTransportista(transportistaId).subscribe(
    (data)=>{
      const respuesta=data.map((numero)=>
      this.apiCertificado.getfindCertificado(numero.valueOf())
      );

      forkJoin(respuesta).pipe(
        map((certificados:Certificado[])=>{
          return certificados.sort((a,b)=>{
            if(a.anio === b.anio){
              return b.mes- a.mes;
            }
            return b.anio-a.anio
          })
        })
      ).subscribe((sortedCertificados)=>{
        this.listaCertificados=sortedCertificados;
        this.cd.detectChanges();
        console.log('Certificados ordenados', this.listaCertificados)
      },
    (error)=>{
      console.error('Error carga Certificados',error)
    }
  );
    },
    (error)=>{
      console.error('Error Carga Transportista', error)
    }
    )
    } */
    
    cargarCertificadosbyTransportista(transportistaId: number | null | undefined): void {
      if (!transportistaId) {
        this.listaCertificados = [];
        return;
      }
      this.listaCertificados = [];
    
      this.apiCertificado.getFindCertificadosByTransportista(transportistaId).pipe(
        switchMap((data) => {
          console.log('Datos antes del ordenamiento:', data); // Verificar datos antes del ordenamiento
          const requests = data.map((numero) =>
            this.apiCertificado.getfindCertificado(numero.valueOf())
          );
          console.log('Solicitudes individuales:', requests); // Verificar solicitudes individuales
          return forkJoin(requests);
        })
      ).subscribe(
        (certificados: Certificado[]) => {
          this.listaCertificados = certificados;

          // Función para comparar certificados
          const compararCertificados = (a: Certificado, b: Certificado) => {
            // Si los años son diferentes, comparar los años directamente
            if (a.anio !== b.anio) {
                return a.anio - b.anio;
            } else {
                // Si los años son iguales, comparar los meses directamente como números
                return a.mes.valueOf() - b.mes.valueOf();
            }
        };

          console.log('Comparando certificados:');
          this.listaCertificados.sort(compararCertificados);

          console.log('Certificados ordenados:', this.listaCertificados);

          this.cd.detectChanges(); // Forzar la detección de cambios
        },
        (error) => {
          console.error('Error carga Certificados', error);
        }
      );
    }
    
  }
