
import { Component, Input, OnInit } from '@angular/core';
import { ResiduoService} from '../services/api-residuo/api.serviceresiduos';
import { Residuo } from '../models/residuo.model';
import { ResiduoDTO } from '../models/residuoDTO';
@Component({
  selector: 'app-residuo',
  templateUrl: './residuo.component.html',
  styleUrls: ['./residuo.component.css'],
 

})

export class ResiduoComponent implements OnInit {
  residuosLista: Residuo[]=[];
  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];
  residuos: ResiduoDTO[] = [];
  @Input() idTicket: number | undefined;
  ngAfterViewInit() {
   
  }
  constructor(private residuoService: ResiduoService) { 
    console.log(this.idTicket)
  }
 ngOnInit(): void {
  if (this.idTicket !== undefined) {
    // Llamar al servicio para obtener los residuos por el id_Ticket
    this.residuoService.getResiduosPorTicket(this.idTicket).subscribe(
      residuos => {
        // Hacer algo con los residuos obtenidos
        this.residuos = residuos;
        console.log('Residuos obtenidos:', residuos);
      },
      error => {
        console.error('Error al obtener residuos:', error);
      }
    );
  } else {
    console.warn('El idTicket es undefined. No se puede obtener residuos.');
  }
}



  }
  

 
 



