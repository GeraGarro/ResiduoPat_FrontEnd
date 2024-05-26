import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup ,Validators,ReactiveFormsModule} from '@angular/forms';
import { ApiGeneradorService } from '../services/api-generador/api-generador.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Generador } from '../models/generador.model';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-generador-formulario',
  templateUrl: './generador-formulario.component.html',
  styleUrls: ['./generador-formulario.component.css']
})
export class GeneradorFormularioComponent implements OnInit{
  modoEdicion: boolean = false;
 formularioGenerador:FormGroup;
 modoIncorporar: boolean = true;


constructor(private form: FormBuilder, private apiGenerador: ApiGeneradorService , private route: ActivatedRoute){
this.formularioGenerador=this.form.group({
  nombre:['',Validators.required],
  cuit:['',[Validators.required,Validators.min(9999999999),Validators.max(99999999999)]],
  direccion:['',Validators.required],
  estadoActividad: ['Activo', Validators.required]
})


 // Verifica si hay datos en el estado de la navegación para determinar el modo
 const generador: Generador = history.state.generador;

 this.modoEdicion = !!generador;

 // Si estás en modo de edición, carga los datos del generador en el formulario
 if (this.modoEdicion) {
  console.log("entre a la edicion",generador)
  const generadorId = history.state.generador?.idGenerador;
 
  this.formularioGenerador.patchValue({
    nombre: generador.nombre,
    cuit: generador.cuit,
    direccion: generador.direccion,
    estadoActividad: generador.estado ? 'Activo' : 'Sin actividad'
  });
 }


  // Verifica si hay datos en la ruta para determinar el modo
  this.route.params.subscribe(params => {
    const modo = params['modo'];

    if (modo === 'editar') {
      this.modoEdicion = true;
      // Puedes ajustar cualquier otra lógica específica para el modo de edición aquí
    } else {
      this.modoEdicion = false;
      this.formularioGenerador.reset();

      // Ajusta la lógica específica para el modo de incorporación aquí
    }
  });

}

ngOnInit(): void {

}

hasErrors(controlNombre : string, errorType: string){
  return this.formularioGenerador.get(controlNombre)?.hasError(errorType) &&
      this.formularioGenerador.get(controlNombre)?.touched
  }

  enviar() {
    console.log('Estado del formulario antes de enviar:', this.formularioGenerador.value);

    if (this.formularioGenerador.valid) {
      const estadoActividad = this.formularioGenerador.value.estadoActividad === 'Activo';
    
      const generador: Generador = {
        nombre: this.formularioGenerador.value.nombre,
        cuit: this.formularioGenerador.value.cuit,
        direccion: this.formularioGenerador.value.direccion,
        estado: estadoActividad
      };
  
      if (this.modoEdicion) {
        const generadorId = history.state.generador?.idGenerador;
        console.log('ID del Generador:', generadorId);

        if (generadorId !== undefined && generadorId !== null) {
          this.apiGenerador.updateGenerador(
            generadorId,
            generador.nombre,
            generador.cuit,
            generador.direccion,
            generador.estado
          ).subscribe(
            (response: Generador) => {
              this.handleSuccessResponse(response);
            },
            (error: any) => {
              console.error('Error detallado al actualizar el generador:', error);
              this.handleErrorResponse(error);
            }
          );
        } else {
          console.error('El id_Generador es undefined.');
        }
      } else {
        // Si no estás en modo edición, realiza la creación normal
        this.apiGenerador.crearGenerador(generador)
          .subscribe(
            (response: Generador) => {
              this.handleSuccessResponse(response);
            },
            (error: any) => {
              this.handleErrorResponse(error);
            }
          );
      }
    } else {
      console.log('Formulario inválido. No se puede enviar.');
    console.log('Errores de validación:', this.formularioGenerador.errors);
  
    }
  }

  private handleSuccessResponse(response: any): void {
    console.log('Respuesta del servidor:', response);
    
    // Verificar si la respuesta tiene un campo "mensaje"
    if (response && response.mensaje) {
      console.log('Mensaje de éxito:', response.mensaje);
    
      // Puedes realizar acciones adicionales después de la creación exitosa, si es necesario
    } else {
      console.error('La respuesta no contiene un campo "mensaje":', response);
    }
  }
  private handleErrorResponse(error: any): void {
    console.error('Error en la petición:', error);
  
    if (error instanceof HttpErrorResponse) {
      console.log('Cuerpo del error:', error.error);
    }
  }
}