import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoResiduo } from 'src/app/services/models/tipo_Residuos';

@Injectable({
  providedIn: 'root'
})
export class ApiServicesTipoResiduosService {

  private baseURL='http://localhost:8080/api/tipoResiduo';
  constructor(private _httpCliente: HttpClient) { }

  public getTipoResiduos():Observable<TipoResiduo[]>{
const urlPeticion=`${this.baseURL}/verTodos`;
return this._httpCliente.get<TipoResiduo[]>(urlPeticion);
  }

  getInfoTipoResiduo(idTipoResiduo: number): Observable<TipoResiduo> 
  { const url = `${this.baseURL}/unTipoResiduo/${idTipoResiduo}`;
    return this._httpCliente.get<TipoResiduo>(url);
  }
  
  agregarTipoResiduo(TipoRes: TipoResiduo):Observable<any>{
  const urlPeticion=`${this.baseURL}/crear`;
    return this._httpCliente.post<any>(urlPeticion,TipoRes);
  }

  public cambioEstadoTipo(id_Tipo:number,nuevoEstado:boolean):Observable<TipoResiduo>{
        const generadorCambio=new HttpParams().set('nuevoEstado',nuevoEstado);
        
        return this._httpCliente.patch<TipoResiduo>(`${this.baseURL}/cambioEstado/${id_Tipo}`, null, { params: generadorCambio });
  
  }

  
  public updateTipoResiduo(tipo_modificado: TipoResiduo, id_Tipo?: number):Observable<any>{
    return this._httpCliente.put<TipoResiduo>(`${this.baseURL}/update/${id_Tipo}`,tipo_modificado)
  }
}
