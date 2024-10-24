import { Component, Input } from '@angular/core';
import { ListaResiduo } from '../models/ticket.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-info',
  standalone: true,
  templateUrl: './modal-info.component.html',
  styleUrls: ['./modal-info.component.css'],
  imports:[CommonModule]
})
export class ModalInfoComponent {
  @Input() nuevosResiduos: ListaResiduo[] = [];
  @Input() residuosModificados: ListaResiduo[] = [];
  @Input() residuosEliminados: ListaResiduo[] = [];
  
  isVisible = false;

  mostrarModal() {
    this.isVisible = true;
  }

  cerrarModal() {
    this.isVisible = false;
  }
}
