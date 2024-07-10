import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { HttpHeaders } from '@angular/common/http';
import { Ocorrencia, Ocorrencias } from '../models/ocorrencia.model';
import { Ruas } from '../models/rua.model';
import { TipoOcorrencias } from '../models/tipoOcorrencia.model';
import { OcorrenciaCreate } from '../models/ocorrenciaCreate.model';

@Injectable({
  providedIn: 'root'
})
export class OcorrenciaService {

  private apiUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }


  getOcorrencias(): Observable<Ocorrencias> {
    return this.http.get<Ocorrencias>(this.apiUrl + '/ocorrencias');
  }

  getRuas(): Observable<Ruas> {
    return this.http.get<Ruas>(this.apiUrl + '/ruas');
  }

  getTipoOcorrencias(): Observable<TipoOcorrencias> {
    return this.http.get<TipoOcorrencias>(this.apiUrl + '/tipos-ocorrencias');
  }

  getOcorrenciaPorId(id: string): Observable<Ocorrencia> {
    return this.http.get<Ocorrencia>(this.apiUrl + '/ocorrencias/' + id);
  }

  criarOcorrencia(ocorrenciaCreate: OcorrenciaCreate): Observable<any> {
    return this.http.post(this.apiUrl + '/ocorrencias', ocorrenciaCreate);
  }

  atualizarOcorrencia(ocorrenciaAtualizar: OcorrenciaCreate): Observable<any> {
    return this.http.put(this.apiUrl + '/ocorrencias/' + ocorrenciaAtualizar.id, ocorrenciaAtualizar);
  }

  deletarOcorrencia(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/ocorrencias/' + id);
  }

}
