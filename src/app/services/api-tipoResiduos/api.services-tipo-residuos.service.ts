import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TipoResiduo } from 'src/app/models/tipo_Residuos';

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

  getInfoTipoResiduo(idTipoResiduo: number): Observable<TipoResiduo> {
    const url = `${this.baseURL}/info_unTipoRes/${idTipoResiduo}`;
    return this._httpCliente.get<TipoResiduo>(url);
  }
  
  agregarTipoResiduo(TipoRes: TipoResiduo):Observable<any>{
  const urlPeticion=`${this.baseURL}/crear`;
    return this._httpCliente.post<any>(urlPeticion,TipoRes);
  }
}
