import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { Residuo } from 'src/app/models/residuo.model';
import { ResiduoDTO } from 'src/app/models/residuoDTO';

@Injectable({
  providedIn: 'root'
})
export class ResiduoService {

  private baseURL = 'http://localHost:8080/api/Residuo';  

  constructor(private _httpClient: HttpClient) {}

  public getResiduos(): Observable<Residuo[]> {
    return this._httpClient.get<Residuo[]>(`${this.baseURL}/verTodos`);
  }
 
  getResiduosPorTicket(id_Ticket:number):Observable<ResiduoDTO[]>{
    const url = `${this.baseURL}/residuo_Por_Ticket/${id_Ticket}`;
    return this._httpClient.get<ResiduoDTO[]>(url);
  }
}
