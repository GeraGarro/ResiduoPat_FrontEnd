import { Component, OnInit, ViewChild } from '@angular/core';
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
   
  ],
  styleUrls: ['./tipo-residuo.component.css']
})
export class TipoResiduoComponent implements OnInit{
ListaTipoResiduos: TipoResiduo[]=[];
ListaTiposActivos: TipoResiduo[]=[];
ListaTiposInactivos: TipoResiduo[]=[];
tipoSeleccionado: TipoResiduo | null = null;
mostrarFormulario: boolean = false;
@ViewChild(RotacionCircularDirective, { static: false }) rotacionCircular!: RotacionCircularDirective;

constructor(private _apiService:ApiServicesTipoResiduosService ){
 
  }

  asignarTipoSeleccionado(tipo: TipoResiduo) {
    this.tipoSeleccionado = tipo;
  }

ngOnInit(): void {
  this._apiService.getTipoResiduos().subscribe(
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

seleccionarTipoResiduo(tipo: TipoResiduo){
  this.ListaTipoResiduos.forEach(tipo_Residuos => tipo_Residuos.seleccionado = false);
  
  // Marcar el tipo de residuo seleccionado
  this.tipoSeleccionado = tipo; 
  
  this.mostrarFormulario = true; 
  console.log(tipo)
}


asignarTipo(tipo: TipoResiduo) {
  this.tipoSeleccionado = tipo;
}

scrollLeft(): void {
  if (this.rotacionCircular) {
    this.rotacionCircular.scrollLeft();
  }
}

scrollRight(): void {
  if (this.rotacionCircular) {
    this.rotacionCircular.scrollRight();
  }
}
}