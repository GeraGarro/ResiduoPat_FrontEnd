import { Component, OnInit } from '@angular/core';
import { TipoResiduo } from '../../../models/tipo_Residuos';
import { ApiServicesTipoResiduosService } from '../../../services/api-tipoResiduos/api.services-tipo-residuos.service';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { TipoResiduoFormularioModule } from '../../../tipo-residuo-formulario/tipo-residuo-formulario.module';
import { RouterModule } from '@angular/router';


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
   TipoResiduoFormularioModule
  
  ],
  styleUrls: ['./tipo-residuo.component.css']
})
export class TipoResiduoComponent implements OnInit{
ListaTipoResiduos: TipoResiduo[]=[];

tipoSeleccionado: TipoResiduo | null = null;
mostrarFormulario: boolean = false;

constructor(private _apiService:ApiServicesTipoResiduosService ){
 
  }

  asignarTipoSeleccionado(tipo: TipoResiduo) {
    this.tipoSeleccionado = tipo;
  }

ngOnInit(): void {
  this._apiService.getTipoResiduos().subscribe(
    data=>{
      this.ListaTipoResiduos=data;
      this.ListaTipoResiduos.forEach(tipoResiduo=>tipoResiduo.seleccionado=false);
      console.log(data);
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

}