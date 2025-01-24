import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generador } from 'src/app/services/models/generador.model';

@Injectable({
  providedIn: 'root'
})
export class ApiGeneradorService {

private baseURL='http://localhost:8080/api/Generador';

  constructor(private _httpClient: HttpClient) { }

  public getGeneradores():Observable<Generador[]>
  {const urlPeticion=`${this.baseURL}/verTodos`;
    return this._httpClient.get<Generador[]>(urlPeticion)
  }

  public getGeneradoresActivos():Observable<Generador[]>
  {const urlPeticion=`${this.baseURL}/activos`;
    return this._httpClient.get<Generador[]>(urlPeticion)
  }

  public getInfoGenerador(id:number):Observable<Generador>
  {const urlPeticion=`${this.baseURL}/infogenerador/${id}`
    return this._httpClient.get<Generador>(urlPeticion)}

    public crearGenerador(gen: Generador): Observable<any>{
      const urlPeticion=` ${this.baseURL}/crear`;
      return this._httpClient.post<any>(urlPeticion,gen);
    }

    public eliminarGenerador(id: number):Observable<Generador>{
      const urlPeticion=`${this.baseURL}/eliminar/${id}`;
      return this._httpClient.delete<any>(urlPeticion);
    }

    public updateGenerador(generador: Generador,id_Generador?:number ):Observable<any>{
   
      return this._httpClient.put<Generador>(`${this.baseURL}/update/${id_Generador}`, generador)
    }

    public cambioEstadoGenerador(id_Generador:number,nuevoEstado:boolean):Observable<Generador>{
      const generadorCambio=new HttpParams().set('nuevoEstado',nuevoEstado);
      
      return this._httpClient.patch<Generador>(`${this.baseURL}/cambioEstado/${id_Generador}`, null, { params: generadorCambio });

    }
}

