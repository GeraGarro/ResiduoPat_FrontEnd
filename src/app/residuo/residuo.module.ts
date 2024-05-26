import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'
import { ResiduoComponent } from './residuo.component';
import { ResiduoFormularioComponent } from '../residuo-formulario/residuo-formulario.component';
import {MatListModule} from '@angular/material/list';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [
    ResiduoComponent,
    ResiduoFormularioComponent
  ],
  imports: [
    MatTableModule,
    MatCardModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    CommonModule,
    MatButtonModule,
    MatListModule,
    ReactiveFormsModule
  ],
  exports:[ResiduoComponent]
})
export class residuoModule {}
