import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TicketControlFormularioComponent } from './ticket-control-formulario.component';
import { CommonModule } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { residuoModule } from '../residuo/residuo.module';
import {MatCardModule} from '@angular/material/card';
import { desplegableCustom } from '../directivas/desplegable';



@NgModule({
  declarations: [
    TicketControlFormularioComponent
  ],

  imports: [
    
    ReactiveFormsModule,
    CommonModule,
    MatFormFieldModule,
    MatInputModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatIconModule,
    MatListModule,
    residuoModule,
    MatCardModule,
    FormsModule,
    desplegableCustom
  ],
  exports: [TicketControlFormularioComponent], // Exporta el componente para que pueda ser utilizado fuera del módulo

  
 })
export class TicketControlFormularioModule {}