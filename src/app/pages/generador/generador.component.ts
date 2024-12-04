import { Component, OnInit, ViewChild,ChangeDetectorRef, Input, Output, EventEmitter  } from '@angular/core';
import { Generador } from '../../models/generador.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiGeneradorService } from '../../services/api-generador/api-generador.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
import { ConfirmacionDialogoComponent } from 'src/app/confirmacion-dialogo/confirmacion-dialogo.component';
import { MatDialog } from '@angular/material/dialog';
import { GeneradorFormularioComponent } from './generador-formulario/generador-formulario.component';
@Component({
  selector: 'app-generador',
  templateUrl: './generador.component.html',
  standalone:true,
  imports: [
    MatTableModule,
    CommonModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
MatSlideToggleModule,
FormsModule,
GeneradorFormularioComponent
  ],
  styleUrls: ['./generador.component.scss']
})
export class GeneradorComponent implements OnInit {
  
ListaGeneradores: Generador[]=[];

dataSource: MatTableDataSource<Generador>;

@Output()contadorEmitido=new EventEmitter<{contado:number}>();

constructor(private _apiGeneradorService:ApiGeneradorService ,private cdr: ChangeDetectorRef, private router: Router, private dialog: MatDialog){
  this.dataSource = new MatTableDataSource<Generador>([]);

}
ngOnInit(): void {
  this._apiGeneradorService.getGeneradores().subscribe(
    data=>{
      console.log(data);
    this.ListaGeneradores=data;
  
    
    this.dataSource=new MatTableDataSource(this.ListaGeneradores);
     this.contadorEmitido.emit({ contado: this.ListaGeneradores.length }); 

    this.cdr.detectChanges();
    },
    error=>{
      console.error('Error fetching Generadores:', error);

    }
  );
}


@ViewChild(MatPaginator) paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

changePageSize(event: any) {
  this.paginator.pageSize = event.value;
  // Puedes realizar otras acciones relacionadas con el cambio del tamaño de la página si es necesario.
}

onRowClicked(row: any): void {
  this.router.navigate(['/generador-Formulario'], { queryParams: { id: row.id } });
}

editarGenerador(id: number) {}


async eliminarGenerador(idGenerador: number) {
  const dialogRef = this.dialog.open(ConfirmacionDialogoComponent);

  const confirmacion = await dialogRef.afterClosed().toPromise();
  if (confirmacion) {
    try {
      const response: any = await this._apiGeneradorService.eliminarGenerador(idGenerador).toPromise();

      if (response.resultado === 'éxito') {
        alert('Mensaje del servidor: ' + response.mensaje);

        // Filtra el registro eliminado sin recargar la página
        this.ListaGeneradores = this.ListaGeneradores.filter(gen => gen.id !== idGenerador);
      } else {
        alert('Mensaje del servidor: ' + response.mensaje);
      }
    } catch (error) {
      console.error('Error al eliminar el generador:', error);
      alert('Error al eliminar el generador. Por favor, inténtalo nuevamente.');
    }
  }
}

cambiarEstadoGenerador(idGenerador: number, nuevoEstado: boolean): void {
  this._apiGeneradorService.cambioEstadoGenerador(idGenerador, nuevoEstado)
    .subscribe((generadorActualizado: Generador) => {
      // Puedes realizar acciones adicionales después de la actualización, si es necesario
      console.log('Estado del generador actualizado:', generadorActualizado);
    }, error => {
      console.error('Error al actualizar el estado del generador:', error);
      // Manejar errores según sea necesario
    });
}

funcionAConfigurar(elment: Generador){

}
}
