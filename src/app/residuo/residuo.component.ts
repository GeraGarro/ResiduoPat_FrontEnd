
import { Component, inject, Input, OnInit, SimpleChanges } from '@angular/core';
import { ListaResiduo, TipoResiduo } from '../models/ticket.model';
import { ResiduoFormularioComponent } from "../residuo-formulario/residuo-formulario.component";
import { CommonModule } from '@angular/common';
import { el } from 'date-fns/locale';
import { ApiServicesTipoResiduosService } from '../services/api-tipoResiduos/api.services-tipo-residuos.service';
@Component({
  selector: 'app-residuo',
  templateUrl: './residuo.component.html',
  styleUrls: ['./residuo.component.css'],
 standalone:true,
 imports: [ResiduoFormularioComponent,CommonModule]

})

export class ResiduoComponent  implements OnInit {
  @Input() residuosLista: ListaResiduo[]=[];
 

  listaTipoResiduos: TipoResiduo[]=[];
apiTipoResiduo=inject(ApiServicesTipoResiduosService)

ngOnInit(): void {
    this.apiTipoResiduo.getTipoResiduos().subscribe(
      (data)=>{
        this.listaTipoResiduos=data;
       
    },
    error=>{
      console.error("ERROR")
    })
}

   ngOnChanges(changes: SimpleChanges): void {
   
    
    if (changes['residuosLista']) {
      // Ahora puedes hacer algo cuando la lista de residuos cambie.
      console.log("Residuos lista actualizada:", this.residuosLista);

      this.totalPeso()
    }
  } 


totalPeso():number{
  let total=0;

  this.residuosLista.forEach(residuo => {
    total +=residuo.peso;
  });

  return total;
}
    
onTipoChange(event: any, item: ListaResiduo) {
  const selectedTipoId = +event.target.value;
  const selectedTipo = this.listaTipoResiduos.find(tipo => tipo.id === selectedTipoId);

  if (selectedTipo) {
    item.tipoResiduo = selectedTipo;
  }
}

getFilteredTipos(item: ListaResiduo): TipoResiduo[] {
  return this.listaTipoResiduos.filter(
    tipo => !this.residuosLista.some(i => i.tipoResiduo.id === tipo.id && i !== item)
  );
}

deleteResiduo(residuo: number):void{

}


}


  
  

 
 



