import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from "@angular/core";
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from "@angular/forms";
import { ApiGeneradorService } from "../../../services/api/api-generador/api-generador.service";
import { HttpErrorResponse } from "@angular/common/http";
import { Generador } from "../../../services/models/generador.model";
import { ActivatedRoute, Router } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ModalComponent } from "../../../modal/modal.component";



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

 @Input() nuevo: boolean = false;
@Output() estadoFormulario = new EventEmitter<{ estadoEdicion: boolean }>();
  titulo: string = "Crear Nuevo Generador";

  mensajeModal:string='';

  modal:boolean=false;

  accionAceptada:boolean=false;
  toggleModal(state: boolean) {
    this.modal = state;
  }
  @Input() idRecibido!: number | undefined;

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
    legajo: [""]
  });


  ngOnInit(): void {
    this.formularioGenerador.disable();
  }

  ngDoCheck(): void {
    if (this.previousModalState !== this.modal) {
      this.previousModalState = this.modal;
      if (!this.modal && this.accionAceptada) {
       location.reload();
      }
    }
  }

   getIdGenerador(id:number|undefined):void {
 
    console.log(`He recibido en formulario el valor: ${id}`)
   
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['idRecibido'] && changes['idRecibido'].currentValue !== undefined) {
      // Si se recibe un ID, activa el modo edición
      this.cargarDatosGenerador(changes['idRecibido'].currentValue);
      this.estadoFormulario.emit({ estadoEdicion: true });
    } else if (changes['nuevo'] && changes['nuevo'].currentValue === true) {
      // Si se activa el modo "nuevo", limpia el formulario y activa la edición
      this.estadoEdicion = false;
      this.formularioGenerador.reset();
      this.hablitarEdicion();
      this.estadoFormulario.emit({ estadoEdicion: true });
    }
  }

  cargarDatosGenerador(id: number): void {
    this.apiGenerador.getInfoGenerador(id).subscribe({
      next: (data) => {
        this.formularioGenerador.patchValue({
          nombre: data.nombre,
          cuit: data.cuit,
          direccion: data.direccion,
         legajo: data.legajo? data.legajo : 'No tiene',
          telefono: data.telefono,
          /* estado: data.estado ? 'activo' : 'inactivo' */
        });
        this.estadoEdicion = true; // Activa el modo de edición si hay datos cargados
      },
      error: (err) => {
        console.error('Error al cargar los datos del generador:', err);
        this.mensajeModal = 'No se pudo cargar la información del generador.';
        this.modal = true; // Mostrar modal de error
      }
    });
  }
  onSubmit() {
    console.log(this.formularioGenerador.value);
    
    const nombre= this.formularioGenerador.controls.nombre.value;
    const cuit= this.formularioGenerador.controls.cuit.value;
    const direccion= this.formularioGenerador.controls.direccion.value;
    const telefono=this.formularioGenerador.controls.telefono.value;
    const legajo= this.formularioGenerador.controls.legajo.value;
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
        legajo:legajo,
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
    this.estadoFormulario.emit({ estadoEdicion: true });
  }
  hasErrors(controlNombre: string, errorType: string) {
    return (
      this.formularioGenerador.get(controlNombre)?.hasError(errorType) &&
      this.formularioGenerador.get(controlNombre)?.touched
    );
  }

}
