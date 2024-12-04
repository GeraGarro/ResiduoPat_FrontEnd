import { Component, Input, OnInit, inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ApiGeneradorService } from "../../../services/api-generador/api-generador.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Generador } from "../../../models/generador.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../../modal/modal.component";
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: "app-generador-formulario",
  standalone: true,
  templateUrl: "./generador-formulario.component.html",
  styleUrls: ["./generador-formulario.component.css"],
  imports: [CommonModule, ReactiveFormsModule, ModalComponent],
})
export class GeneradorFormularioComponent implements OnInit {

  estadoEdicion: boolean = false;
 private  idGenerador?: number;
  titulo: string = "Crear Nuevo Generador";

  mensajeModal:string='';

  modal:boolean=false;

  accionAceptada:boolean=false;
  toggleModal(state: boolean) {
    this.modal = state;
  }


  private readonly router=inject(Router);
  private readonly _activatedRouter = inject(ActivatedRoute);
  private previousModalState: boolean = this.modal;
  private readonly _formBuilder = inject(FormBuilder);
  private apiGenerador=inject(ApiGeneradorService)


  formularioGenerador = this._formBuilder.nonNullable.group({
    nombre: ["", Validators.required],
    cuit:   [
              "",[
                  Validators.required,
                  Validators.min(9999999999),
                  Validators.max(99999999999),
                ],
            ],
    direccion:["", Validators.required],
    telefono: ["", Validators.required],
    estadoActividad: ["Activo", Validators.required],
  });

  ngOnInit(): void {
    this.getIdGenerador();
  }

  ngDoCheck(): void {
    if (this.previousModalState !== this.modal) {
      this.previousModalState = this.modal;
      if (!this.modal && this.accionAceptada) {
       setTimeout(()=>{
        this.router.navigate(['/home']);
       },2000)
       
       
      }
    }
  }


  getIdGenerador() {
 
    this._activatedRouter.queryParamMap.subscribe((params) => {
      const idParametro = params.get("id");
      let generador: Generador;
      if (idParametro !== null) {
        this.idGenerador = +idParametro;

      
        this.titulo = "Edición de Generador Existente";

        this.apiGenerador
          .getInfoGenerador(this.idGenerador)
          .subscribe((data) => {
            console.log(data)
            this.formularioGenerador.setValue({
              nombre: data.nombre,
              cuit: data.cuit,
              direccion: data.direccion,
              telefono: data.telefono,
              estadoActividad: data.estado ? "Activo" : "Sin actividad",
            });
          });
        this.formularioGenerador.disable();
        this.estadoEdicion = true;
      }
    });
  }

  onSubmit() {
    console.log(this.formularioGenerador.value);
    
    const nombre= this.formularioGenerador.controls.nombre.value;
    const cuit= this.formularioGenerador.controls.cuit.value;
    const direccion= this.formularioGenerador.controls.direccion.value;
    const telefono=this.formularioGenerador.controls.telefono.value;
    let estado=false;
    const estadoActividad=this.formularioGenerador.controls.estadoActividad.value;

    if(estadoActividad=="Activo"){estado=true;};

    if(this.estadoEdicion)
    {
      console.log("ID Generador ",this.idGenerador);
      const id= this.idGenerador;
      this.apiGenerador.updateGenerador(id, nombre, cuit, telefono, direccion, estado).subscribe(
        response => {
            console.log('Generador actualizado', response);
            // Maneja la respuesta exitosamente
        },
        error => {
            console.error('Error al actualizar el generador', error);
            // Maneja el error
        }
    );
    }
    else
    {
      let nuevoGenerador:Generador=
      {
        nombre:nombre,
        cuit:cuit,
        direccion:direccion,
        telefono:telefono,
        estado:estado
      }

      this.apiGenerador.crearGenerador(nuevoGenerador).subscribe(
        response => {
          console.log(response);
          this.modal=true; 
          this.mensajeModal = response['message'];
          this.accionAceptada=true
      },
        error => {
          console.error('Error al crear el generador', error);
          this.mostrarError(error);
          this.modal=true;
      }
      )  
    }
  }

  mostrarModal() {
    this.modal = true;
    setTimeout(() => {
      this.modal = false;
    }, 3000);
  }

  mostrarError(error: HttpErrorResponse) {
    if (error.error && error.error.message) {
      this.mensajeModal = error.error.message;
    } else {
      this.mensajeModal = 'Ocurrió un error inesperado';
    }
  }
  hablitarEdicion() {
    this.formularioGenerador.enable();
    this.estadoEdicion = true;
  }

  hasErrors(controlNombre: string, errorType: string) {
    return (
      this.formularioGenerador.get(controlNombre)?.hasError(errorType) &&
      this.formularioGenerador.get(controlNombre)?.touched
    );
  }

}
