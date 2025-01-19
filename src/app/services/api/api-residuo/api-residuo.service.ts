import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Residuo } from 'src/app/services/models/residuo.model';
import { ListaResiduo } from 'src/app/services/models/ticket.model';

@Injectable({
  providedIn: 'root'
})
export class ApiResiduoService {

private baseURL='http://localhost:8080/api/Residuo'

  constructor(private _httpClient: HttpClient) { }

  public getInfoResiduo(id:number):
  Observable<Residuo>{
    const urlPeticion=`${this.baseURL}/unResiduo/${id}`
  return this._httpClient.get<Residuo>(urlPeticion)
  }

  public crearResiduo(res: ListaResiduo):Observable <any>{
    const urlPeticion=`${this.baseURL}/crear`
    return this._httpClient.post<any>(urlPeticion,res)
  }

  public eliminarResiduo(id: number):Observable<Residuo>{
    const urlPeticion= `${this.baseURL}/eliminar/${id}`
    return this._httpClient.delete<any>(urlPeticion)

  }

  public updateResiduo(id: number, residuo: any): Observable<any>{
    const headers= new HttpHeaders({ 'Content-Type': 'application/json'})
    const url=`${this.baseURL}/update/${id}`;
    return this._httpClient.put(url,residuo, {headers})

  }
}