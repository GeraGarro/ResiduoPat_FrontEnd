import {
  ChangeDetectorRef,
  Component,
  OnInit,
  
} from '@angular/core';
import { Certificado } from '../../services/models/certificado.model';
import { ApiCertificadoService } from '../../services/api/api-certificado/api-certificado.service';
import { CommonModule } from '@angular/common';
import { ApiTransportistaService } from '../../services/api/api-transportista/api-transportista.service';
import { Transportista } from '../../services/models/transportista.model';
import { FormsModule } from '@angular/forms';
import { forkJoin, switchMap } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-certificado',
  standalone: true,
  templateUrl: './certificado.component.html',
  styleUrls: ['./certificado.component.css'],
  imports: [

    CommonModule,
    
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatFormFieldModule
  ],
})
export class CertificadoComponent implements OnInit {
  listaCertificados: Certificado[] = [];
  listaTransportistas: Transportista[] = [];
  selectTransportistaId?: number | null = null;
  isSelectTransportista: boolean = false;
  selectedCertificadoId?: number;

  constructor(
    private apiCertificado: ApiCertificadoService,
    private apiTransportista: ApiTransportistaService,
    private cd: ChangeDetectorRef
  ) {}

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
  }

  onSelectTransportista(transportistaId: number): void {
    this.isSelectTransportista = true;
    this.cargarCertificadosbyTransportista(transportistaId);
  }

  onSelectCertificado(certificadoId: number): void {
    this.selectedCertificadoId = certificadoId;
  }

  cargarCertificadosbyTransportista(transportistaId: number | null | undefined): void {
    if (!transportistaId) {
      this.listaCertificados = [];
      return;
    }

    this.listaCertificados = [];

    this.apiCertificado.getFindCertificadosByTransportista(transportistaId).pipe(
      switchMap((data) => {
        console.log('Datos antes del ordenamiento:', data);
        const requests = data.map((numero) =>
          this.apiCertificado.getfindCertificado(numero.valueOf())
        );
        return forkJoin(requests);
      })
    ).subscribe(
      (certificados: Certificado[]) => {
        this.listaCertificados = certificados;

        // Ordenar certificados primero por año y luego por mes
        this.listaCertificados.sort((a, b) => {
          if (a.anio !== b.anio) {
            return a.anio - b.anio;
          }
          return a.mes.valueOf() - b.mes.valueOf();
        });

        console.log('Certificados ordenados:', this.listaCertificados);

        this.cd.detectChanges();
      },
      (error) => {
        console.error('Error carga Certificados', error);
      }
    );
  }
}