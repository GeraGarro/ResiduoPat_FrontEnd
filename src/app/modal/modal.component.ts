import { Component } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone:true,
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {

  mensaje:string='El Certificado fue realizado con Exito';

  constructor(){
    
  }

  ngOnInit(): void {
    
  }
}
