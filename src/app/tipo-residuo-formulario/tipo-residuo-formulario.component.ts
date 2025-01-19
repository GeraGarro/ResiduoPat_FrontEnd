import { Component, Input,SimpleChanges, Output, EventEmitter,ChangeDetectorRef,    } from '@angular/core';
import { TipoResiduo } from '../services/models/tipo_Residuos';
import { FormBuilder, FormGroup, Validators,FormControlDirective } from '@angular/forms';
import { ApiServicesTipoResiduosService } from '../services/api/api-tipoResiduos/api.services-tipo-residuos.service';

@Component({
  selector: 'app-tipo-residuo-formulario',
  standalone:true,
  templateUrl: './tipo-residuo-formulario.component.html',
  styleUrls: ['./tipo-residuo-formulario.component.css']
})
export class TipoResiduoFormularioComponent {

  private _tipoSeleccionado: TipoResiduo | null = null; 

  @Input()
  set tipoSeleccionado(valor: TipoResiduo | null) {
    this._tipoSeleccionado = valor;
    this.actualizarFormulario();
  }

    formularioTipoResiduo: FormGroup;
    mostrarFormulario: boolean = false;


    @Output() tipoSeleccionadoChange = new EventEmitter<TipoResiduo>();

  constructor(private form:FormBuilder, private _apiService: ApiServicesTipoResiduosService,private cdr: ChangeDetectorRef){
    this.formularioTipoResiduo=this.form.group(
      {
        id_tipoResiduo:[''],
        nombre_tipoResiduo:['',Validators.required]
      }
    )
    this.formularioTipoResiduo.get('id_tipoResiduo')?.disable();

  }
  ngOnChanges(changes: SimpleChanges) {
    console.log('Cambios detectados:', changes);

    if (changes['_tipoSeleccionado'] && this._tipoSeleccionado) {
      this.actualizarFormulario();
    }
  }
  private actualizarFormulario() {
    console.log('Tipo seleccionado: tipo residuo:', this._tipoSeleccionado);

    this.formularioTipoResiduo.patchValue({
      id_tipoResiduo: this._tipoSeleccionado?.id,
      nombre_tipoResiduo: this._tipoSeleccionado?.nombre,
      
    });

    this.cdr.detectChanges();
  }
hasErrors(controlNombre:string,errorType:string){
  return this.formularioTipoResiduo.get(controlNombre)?.hasError(errorType) &&
  this.formularioTipoResiduo.get(controlNombre)?.touched
  
}

enviar(){
  
}
}
