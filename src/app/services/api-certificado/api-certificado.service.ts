import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Certificado } from 'src/app/models/certificado.model';

@Injectable({
  providedIn: 'root'
})
export class ApiCertificadoService {
  private baseURL='http://localhost:8080/api/Certificado';
  constructor(private httpSOlicitud: HttpClient) { }

  public getCertificados():Observable<Certificado[]>
  {const urlPeticion=`${this.baseURL}/verTodos`;
    return this.httpSOlicitud.get<Certificado[]>(urlPeticion)
  }

  public getfindCertificado(id:number):Observable<Certificado>
  {
const urlPeticion=`${this.baseURL}/infocertificado/${id}`;
return this.httpSOlicitud.get<Certificado>(urlPeticion)
  }

  public getFindCertificadosByTransportista(id:number):Observable<Number[]>
  {
    const urlPeticion=`${this.baseURL}/FiltroTransportista/${id}`;
    return this.httpSOlicitud.get<Number[]>(urlPeticion);
  }

  public saveNewCertificado(certificado:Certificado):Observable<any>{
    const urlAdd=`${this.baseURL}/crear`;
    return this.httpSOlicitud.post<any>(urlAdd,certificado)
  }
}
