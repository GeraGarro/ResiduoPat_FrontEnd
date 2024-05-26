import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TipoResiduoFormularioComponent } from './tipo-residuo-formulario.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [TipoResiduoFormularioComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    TipoResiduoFormularioComponent
  ]
})
export class TipoResiduoFormularioModule { }
