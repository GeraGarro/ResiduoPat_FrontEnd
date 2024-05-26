import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TransportistaComponent } from './transportista/transportista.component';
import { GeneradorFormularioComponent } from './generador-formulario/generador-formulario.component';
import { TransportistaFormularioComponent } from './transportista-formulario/transportista-formulario.component';
import{HttpClientModule} from '@angular/common/http';
import {MatCardModule} from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';

import { residuoModule } from './residuo/residuo.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import localeEs from '@angular/common/locales/es-AR'
import { registerLocaleData } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import{residuoModalModule} from './residuo-modal/residuo-modal.module';
import { TicketControlFormularioModule } from './ticket-control-formulario/ticket-control-formulario.module';
import { DateFnsAdapter,DateFnsModule } from '@angular/material-date-fns-adapter';
import{es} from 'date-fns/locale';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE, MatDateFormats } from '@angular/material/core';


import { MatPaginatorModule } from '@angular/material/paginator';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ModalComponent } from './modal/modal.component';



export const Date_Formats: MatDateFormats={
  parse:{ dateInput:'dd-MM-yyyy'},
  display:{
    dateInput:'dd-MM-yyyy',
    monthYearLabel:'MM yyyy',
    dateA11yLabel: 'LL',
    monthYearA11yLabel:'yyyy'
  }
}


registerLocaleData(localeEs,'es');



@NgModule({
  declarations: [
    AppComponent,
    TransportistaComponent,
    GeneradorFormularioComponent,
    TransportistaFormularioComponent,
 
   
   

 
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
MatCardModule,
    TicketControlFormularioModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MatDialogModule,
    residuoModalModule,
  
    residuoModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    
  ],
  providers: [{provide:localeEs,useValue:'es'},{provide:DateAdapter, useClass:DateFnsAdapter},{provide:MAT_DATE_FORMATS,useValue:Date_Formats},{provide:MAT_DATE_LOCALE,useValue:es}],
  bootstrap: [AppComponent]
})
export class AppModule { }