import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { TipoResiduo } from '../../services/models/tipo_Residuos';
import { ApiServicesTipoResiduosService } from '../../services/api/api-tipoResiduos/api.services-tipo-residuos.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { RouterModule } from '@angular/router';
import { RotacionCircularDirective } from 'src/app/directivas/rotacion-circular.directive';
import { TipoResiduoFormularioComponent } from './tipo-residuo-formulario/tipo-residuo-formulario.component';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tipo-residuo',
  templateUrl: './tipo-residuo.component.html',
  standalone:true,
  imports: [
    RouterModule,
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatCardModule,
    MatFormFieldModule,
    MatSelectModule,
    ReactiveFormsModule,
   MatRadioModule,
   FormsModule,
   TipoResiduoFormularioComponent
  ],
  styleUrls: ['./tipo-residuo.component.css']
})
export class TipoResiduoComponent implements OnInit{
ListaTipoResiduos: TipoResiduo[]=[];
ListaTiposActivos: TipoResiduo[]=[];
ListaTiposInactivos: TipoResiduo[]=[];


idSeleccionado: number | undefined;
mostrarFormulario: boolean = false;

isActivo:boolean=false;

@ViewChild(RotacionCircularDirective, { static: false }) rotacionCircular!: RotacionCircularDirective;

selectedIndex: number | null = null;
nuevo: boolean = false;

private currentOffset = 0; // Mantiene la posición actual del desplazamiento
private itemHeight = 100; // Altura de cada item (en píxeles, ajusta según tu diseño)
private visibleItemsCount = 10; // Número de ítems visibles a la vez (ajusta según el contenedor)
private cdr= inject(ChangeDetectorRef)
constructor(private _apiTipoResiduo:ApiServicesTipoResiduosService ){
 
  }


ngOnInit(): void {
  this._apiTipoResiduo.getTipoResiduos().subscribe(
    data=>{
      this.ListaTipoResiduos=data;
      this.ListaTipoResiduos.forEach(
        tipoResiduo=>{
          if(tipoResiduo.estado){
            this.ListaTiposActivos.push(tipoResiduo)
          }else{
            this.ListaTiposInactivos.push(tipoResiduo)
          }
        });
      console.log(data);
      console.log(`Activos:${this.ListaTiposActivos.length}`)
      console.log(`Inactivos:${this.ListaTiposInactivos.length}`)

    
    }
  )
}


seleccionarElemento(index: number, id:number|undefined) {
 
  this.selectedIndex = index; 

  this.activarFormulario() // Mostrar el formulario al seleccionar un elemento
  this.nuevo = false; // Desactivar el modo "nuevo"

  this.idSeleccionado=id;
console.log("id seleccionado: "+this.idSeleccionado)
 this.isActivo=true;

 this.nuevo = false; // Para indicar que no es un formulario nuevo, sino de edición

 
}

activarFormulario() {
  this.mostrarFormulario = true;
  // Forzar la actualización del tamaño del DOM
  this.cdr.detectChanges();
}

/* Actualizar estado de Actividad Generadores mediante solicitud Update a estado */
cambiarEstado(id: number | undefined, estado: boolean): void {
  if (!id) {
    console.warn('ID no disponible.');
    return;
  }

  // Realiza el cambio de estado
  this._apiTipoResiduo.cambioEstadoTipo(id, estado).subscribe({
    next: (respuesta) => {
      console.log('Estado actualizado:', respuesta);
      const generadorActualizado = this.ListaTipoResiduos.find((gen) => gen.id === id);
      if (generadorActualizado) {
        generadorActualizado.estado = estado; // Actualiza el estado en la lista local
      }
    },
    error: (error) => {
      console.error('Error al cambiar el estado:', error);
    }
  });
}


scrollUp() {
  // Límite superior
  const maxOffset = 0;
  this.currentOffset = Math.min(this.currentOffset + this.itemHeight, maxOffset);
  this.updateTransform();
}

scrollDown() {
  // Límite inferior
  const maxOffset = -this.itemHeight * (this.ListaTipoResiduos.length - this.visibleItemsCount);
  this.currentOffset = Math.max(this.currentOffset - this.itemHeight, maxOffset);
  this.updateTransform();
}
private updateTransform() {
  const listaElement = document.querySelector('.contenedor-lista') as HTMLElement;
  if (listaElement) {
    listaElement.style.transform = `translateY(${this.currentOffset}px)`;
  }
}
}