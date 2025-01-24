import { Component, Input,SimpleChanges, Output, EventEmitter,ChangeDetectorRef, inject, OnInit,    } from '@angular/core';
import { TipoResiduo } from '../../../services/models/tipo_Residuos';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ApiServicesTipoResiduosService } from '../../../services/api/api-tipoResiduos/api.services-tipo-residuos.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ModalComponent } from 'src/app/modal/modal.component';

@Component({
  selector: 'app-tipo-residuo-formulario',
  standalone:true,
    imports: [CommonModule, ReactiveFormsModule, ModalComponent],
  templateUrl: './tipo-residuo-formulario.component.html',
  styleUrls: ['./tipo-residuo-formulario.component.css']
})
export class TipoResiduoFormularioComponent implements OnInit{

  /* Comportamiento del Modal */
  mensajeModal:string='';
  modal:boolean=false;
  accionAceptada:boolean=false;
  toggleModal(state: boolean) {
    this.modal = state;
  }

  estadoActivado: boolean = true;

  @Input() nuevo: boolean = true;
  @Output() estadoFormulario = new EventEmitter<{ estadoEdicion: boolean }>();
  textoBotonSubmit: string= '';


  @Input() idRecibido!: number | undefined;

 private readonly router=inject(Router);
  private readonly _activatedRouter = inject(ActivatedRoute);
  private previousModalState: boolean = this.modal;
  private readonly _formBuilder = inject(FormBuilder);
  private apiTipoResiduo=inject(ApiServicesTipoResiduosService);
private cdr= inject(ChangeDetectorRef);
  private _tipoSeleccionado: TipoResiduo | null = null; 

    mostrarFormulario: boolean = false;

    formularioTipoResiduo=this._formBuilder.nonNullable.group(
      {
        nombre_tipo:['',Validators.required],
        codigo_tipo:['']
      });
   
ngOnInit(): void {
 
  if (this.nuevo) {
    this.formularioTipoResiduo.enable();
    this.estadoActivado=false // Si es nuevo, habilita el formulario
  } else {
    this.formularioTipoResiduo.disable(); // Deshabilita el formulario si no es nuevo
  }
  
}
    



ngOnChanges(changes:SimpleChanges):void{
  if (changes['idRecibido'] && changes['idRecibido'].currentValue !== undefined) {
    // Si se recibe un ID, activa el modo edición

    this.cargaDatosUnTipo(changes['idRecibido'].currentValue);
    this.estadoFormulario.emit({ estadoEdicion: true });
    this.textoBotonSubmit=' Aceptar Cambios';
    
  } else if (changes['nuevo'] && changes['nuevo'].currentValue === true) {
    // Si se activa el modo "nuevo", limpia el formulario y activa la edición

    this.formularioTipoResiduo.reset();
    this.formularioTipoResiduo.enable();
    this.textoBotonSubmit='Crear Nuevo';
    this.estadoFormulario.emit({ estadoEdicion: true });
  }
}
//carga de datos de un residuo TipoResiduo
cargaDatosUnTipo(id: number):void{
  this.apiTipoResiduo.getInfoTipoResiduo(id).subscribe({
    next: (data)=> {
   
      this.formularioTipoResiduo.patchValue({
        nombre_tipo: data.nombre,
        codigo_tipo: data.codigo,
      
      });
      
      this.estadoActivado=true;
      this.cdr.markForCheck();
    },
    error:(err)=>{
      this.mensajeModal="Error al intentar cargar la información";
      this.modal=true;
    }
  });
}
  hasErrors(controlNombre: string, errorType: string) {
    return (
      this.formularioTipoResiduo.get(controlNombre)?.hasError(errorType) &&
      this.formularioTipoResiduo.get(controlNombre)?.touched
    );
  }

  mostrarError(error: HttpErrorResponse) {
    if (error.error && error.error.message) {
      this.mensajeModal = error.error.message;
    } else {
      this.mensajeModal = 'Ocurrió un error inesperado';
    }
  }

enviar(){
  
}
}
