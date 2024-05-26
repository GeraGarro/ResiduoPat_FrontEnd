import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Generador } from 'src/app/models/generador.model';

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

    public crearGenerador(gen: Generador): Observable<any>{
      const urlPeticion=` ${this.baseURL}/crear`;
      return this._httpClient.post<any>(urlPeticion,gen);
    }

    public eliminarGenerador(id: number):Observable<any>{
      const urlPeticion=`${this.baseURL}/eliminar/${id}`;
      return this._httpClient.delete<any>(urlPeticion);
    }

    public updateGenerador(id_Generador:number,nuevoNombre?:string,nuevoCuit?:string,nuevaDireccion?:string,nuevoEstado?:boolean):Observable<Generador>{
      let generadorEdito=new HttpParams();

      if(nuevoNombre){generadorEdito=generadorEdito.set('nuevoNombreGen',nuevoNombre)}
      if(nuevoCuit){generadorEdito=generadorEdito.set('nuevoCuitGen',nuevoCuit)}
      if(nuevaDireccion){generadorEdito=generadorEdito.set('nuevaDireccionGen',nuevaDireccion)}
      if(nuevoEstado){generadorEdito=generadorEdito.set('nuevoEstadoGen',nuevoEstado)}

      return this._httpClient.put<Generador>(`${this.baseURL}/editar/${id_Generador}`, null, {params:generadorEdito})
    }

    public cambioEstadoGenerador(id_Generador:number,nuevoEstado:boolean):Observable<Generador>{
      const generadorCambio=new HttpParams().set('nuevoEstado',nuevoEstado);
      
      return this._httpClient.patch<Generador>(`${this.baseURL}/cambioEstado/${id_Generador}`, null, { params: generadorCambio });

    }
}

