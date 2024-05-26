import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import { ITicket} from 'src/app/models/ticket.model';
@Injectable({
  providedIn: 'root'
})
export class ApiTicketService {

  private baseURL = 'http://localhost:8080/api/TicketControl';  

  constructor(private _httpClient: HttpClient) {}

  public getTickets(): Observable<ITicket[]> {
    const getTodosTicket=`${this.baseURL}/verTodos`;
    return this._httpClient.get<ITicket[]>(getTodosTicket);
  }
 
  public eliminarTicket(id:number):Observable<any>{
    const urlDelete=`${this.baseURL}/eliminar/${id}`;
    return this._httpClient.delete<any>(urlDelete);
  }

  public addTicket(ticket:ITicket):Observable<any>{
const urlAdd= `${this.baseURL}/crear`;
    return this._httpClient.post<any>(urlAdd,ticket);
  }

  public updateTicket(id_Ticket:number, ticket: ITicket): Observable<any>{
    const urlUpdate=`${this.baseURL}/editar/${id_Ticket}`;
    return this._httpClient.put<any>(urlUpdate,ticket);
  }

  public getTicketById(id: number): Observable<ITicket> {
    const url = `${this.baseURL}/UnTicket/${id}`;
    return this._httpClient.get<ITicket>(url);
  }

  public getReporteTicketById(id:number): Observable<any>{
    const urlReport=`${this.baseURL}/generadorPDF/${id}`;
    return this._httpClient.get<any>(urlReport)
  }
}
