import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  @Input() estiloContenedorPrincipal!: any; // Type can be more specific if styles are known

  @Input() titulo!: string ; 

  @Input() contador?:number;
  @Input() url?:string;
}