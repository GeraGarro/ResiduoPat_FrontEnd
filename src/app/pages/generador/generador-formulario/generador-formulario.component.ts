import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, SimpleChanges, inject } from "@angular/core";
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
  private apiGenerador=inject(ApiGeneradorService);
private cdr= inject(ChangeDetectorRef);

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

    console.log(`el id recibido del componente padre es ${this.idRecibido}`)
    if (this.nuevo) {
      this.formularioGenerador.enable();
      this.estadoActivado=false // Si es nuevo, habilita el formulario
    } else {
      this.formularioGenerador.disable(); // Deshabilita el formulario si no es nuevo
    }
  }

  ngDoCheck(): void {
    if (this.previousModalState !== this.modal) {
      this.previousModalState = this.modal;
      if (!this.modal && this.accionAceptada) {
       location.reload();
      }
    }

  }

  ngOnChanges(changes: SimpleChanges): void {

 
    if (changes['idRecibido'] && changes['idRecibido'].currentValue !== undefined) {
      // Si se recibe un ID, activa el modo edición
      this.cargarDatosGenerador(changes['idRecibido'].currentValue);
      this.estadoFormulario.emit({ estadoEdicion: true });
      this.textoBotonSubmit=' Aceptar Cambios';
    } else if (changes['nuevo'] && changes['nuevo'].currentValue === true) {
      // Si se activa el modo "nuevo", limpia el formulario y activa la edición

      this.formularioGenerador.reset();
      this.formularioGenerador.enable();
      this.textoBotonSubmit='Crear Nuevo';
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
        telefono: data.telefono? data.telefono : 'No registra telefono',
        
        });
        this.estadoActivado = true; // Activa el modo de edición si hay datos cargados
      },
      error: (err) => {
        console.error('Error al cargar los datos del generador:', err);
        this.mensajeModal = 'No se pudo cargar la información del generador.';
        this.modal = true; // Mostrar modal de error
      }
    });
  }
  

  /* Metodo para enviar solicitud get e ingresar nuevo Generador a  BD */
  onSubmit() { 
    const nombre= this.formularioGenerador.controls.nombre.value;
    const cuit= this.formularioGenerador.controls.cuit.value;
    const direccion= this.formularioGenerador.controls.direccion.value;
    const telefono=this.formularioGenerador.controls.telefono.value;
    const legajo= this.formularioGenerador.controls.legajo.value;
    let estado=true;
  
    let generadorSubmit :Generador=
    {
      nombre:nombre,
      cuit:cuit,
      direccion:direccion,
      telefono: telefono==='No registra telefono'? undefined:telefono,
    
      legajo: legajo==='No tiene'? undefined:legajo,
      estado:estado
    }

    if(this.idRecibido!=null){
  
      this.apiGenerador.updateGenerador(generadorSubmit,this.idRecibido).subscribe(
        response => {

          this.modal=true; 
          this.mensajeModal = response['message'];
          this.accionAceptada=true;
          setTimeout(()=>{
            location.reload();
          },2500)
        },
        error => {
          console.error('Error al crear el generador', error);
          this.mostrarError(error);
          this.modal=true;
        }
    );
     
    }
    else
    {
     

      this.apiGenerador.crearGenerador(generadorSubmit).subscribe(
        response => {
          console.log(response);
          this.modal=true; 
          this.mensajeModal = response['message'];
          this.accionAceptada=true;
          setTimeout(()=>{
            location.reload();
          },2500)
         
      },
        error => {
          console.error('Error al crear el generador', error);
          this.mostrarError(error);
          this.modal=true;
      }
      )  
    }
   
  }


  hablitarEdicion() {
    this.formularioGenerador.enable();
    this.estadoActivado=false;
    this.cdr.markForCheck();
    console.log(this.estadoActivado)
  }

  hasErrors(controlNombre: string, errorType: string) {
    return (
      this.formularioGenerador.get(controlNombre)?.hasError(errorType) &&
      this.formularioGenerador.get(controlNombre)?.touched
    );
  }

/* Comportamiento  de modal*/
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
}
