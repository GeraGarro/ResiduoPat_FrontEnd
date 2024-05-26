import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TicketControlComponent } from './ticket-control/ticket-control.component';
import { ResiduoComponent } from './residuo/residuo.component';
import { TipoResiduoComponent } from './tipo-residuo/tipo-residuo.component';
import { GeneradorComponent } from './generador/generador.component';
import { TransportistaComponent } from './transportista/transportista.component';
import { TicketControlFormularioComponent } from './ticket-control-formulario/ticket-control-formulario.component';
import { ResiduoFormularioComponent } from './residuo-formulario/residuo-formulario.component';
import { TipoResiduoFormularioComponent } from './tipo-residuo-formulario/tipo-residuo-formulario.component';
import { CertificadoComponent } from './certificado/certificado.component';
import { TransportistaFormularioComponent } from './transportista-formulario/transportista-formulario.component';
import { GeneradorFormularioComponent } from './generador-formulario/generador-formulario.component';
import { CertificadoFormularioComponent } from './certificado-formulario/certificado-formulario.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{path:'ticket',component:TicketControlComponent},
{path:'', component:HomeComponent},
{path:'ticket-control_Formulario',component: TicketControlFormularioComponent},
{path: 'formulario-ticket/:id', component: TicketControlFormularioComponent },
{path:'residuo',component: ResiduoComponent},
{path:'residuo_Formulario',component: ResiduoFormularioComponent},
{path:'tipo-residuo',component: TipoResiduoComponent},
{path:'tipo-residuo_Formulario',component: TipoResiduoFormularioComponent},
{path:'generador',component: GeneradorComponent},
{path:'generador_Formulario/:modo',component: GeneradorFormularioComponent},
{path:'certificado',component: CertificadoComponent},
{path: 'certificado_formulario',component:CertificadoFormularioComponent},
{path:'transportista',component: TransportistaComponent},
{path:'transportista_Formulario',component: TransportistaFormularioComponent},
{path:'home',component: HomeComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
