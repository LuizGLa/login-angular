import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  private apiUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }


  getOcorrencias(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/ocorrencias');
  }

  getRuas(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl + '/ruas');
  }

  getOcorrenciaPorId(id: string): Observable<any> {
    return this.http.get<any>(this.apiUrl + '/ocorrencias/' + id);
  }

}
