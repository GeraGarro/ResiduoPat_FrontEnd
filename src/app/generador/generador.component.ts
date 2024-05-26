import { Component, OnInit, ViewChild,ChangeDetectorRef, Input, Output, EventEmitter  } from '@angular/core';
import { Generador } from '../models/generador.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { ApiGeneradorService } from '../services/api-generador/api-generador.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { FormsModule } from '@angular/forms';
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
FormsModule
  ],
  styleUrls: ['./generador.component.css','./generador.component.scss']
})
export class GeneradorComponent implements OnInit {
  
ListaGeneradores: Generador[]=[];

columnas: string[] = [ 'nombre', 'estado','acciones'];

dataSource: MatTableDataSource<Generador>;

@Output()contadorEmitido=new EventEmitter<{contado:number}>();

constructor(private _apiGeneradorService:ApiGeneradorService ,private cdr: ChangeDetectorRef, private router: Router){
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

editarGenerador(id: number, nombre: string, cuit: string, direccion: string, estado: boolean) {

 
    const generador = { id, nombre, cuit, direccion, estado };
    console.log('Datos del generador:', generador);
    this.router.navigate(['/generador_Formulario','editar'], { state: { generador } });

}
async eliminarGenerador(idGenerador: number) {
  if (confirm('¿Estás seguro de que deseas eliminar este generador?')) {
    try {
      // Realiza la solicitud de eliminación
      const response: any = await this._apiGeneradorService.eliminarGenerador(idGenerador).toPromise();

      if (response.resultado === 'éxito') {
        // Muestra el mensaje de éxito al usuario
        
        alert('Mensaje del servidor: ' + response.mensaje);

        // Recarga completamente la página después de la eliminación
        window.location.reload();
      } else {
        // Muestra el mensaje de error al usuario
        alert('Mensaje del servidor: ' + response.mensaje);
      }
    } catch (error) {
      console.error('Error al eliminar el generador:', error);

      // Muestra un mensaje de error al usuario
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
