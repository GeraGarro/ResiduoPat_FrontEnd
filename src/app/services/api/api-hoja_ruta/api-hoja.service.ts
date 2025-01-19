import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {  Hoja_ruta } from 'src/app/services/models/hoja_ruta.model';

@Injectable({
  providedIn: 'root'
})
export class ApiHojaService {

  private baseURL= 'http://localhost:8080/api/HojaRuta'
  constructor(private _httpClient: HttpClient) { }

public getHojaActual(): Observable<Hoja_ruta >{
  const url= `${this.baseURL}/actual`;

  return this._httpClient.get<Hoja_ruta>(url);
 }

}
