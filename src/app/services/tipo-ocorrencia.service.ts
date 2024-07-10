import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoOcorrencia, TipoOcorrencias } from '../models/tipoOcorrencia.model';
import { TipoOcorrenciaCreate } from '../models/tipoOcorrenciaCreate.model';

@Injectable({
  providedIn: 'root'
})
export class TipoOcorrenciaService {

  private apiUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }

  getTipoOcorrencias(): Observable<TipoOcorrencias> {
    return this.http.get<TipoOcorrencias>(this.apiUrl + '/tipos-ocorrencias');
  }

  getTipoOcorrenciaPorId(id: string): Observable<TipoOcorrencia> {
    return this.http.get<TipoOcorrencia>(this.apiUrl + '/tipos-ocorrencias/' + id);
  }

  criarTipoOcorrencia(tiipoOcorrenciaCreate: TipoOcorrenciaCreate): Observable<any> {
    return this.http.post(this.apiUrl + '/tipos-ocorrencias', tiipoOcorrenciaCreate);
  }

  atualizarTipoOcorrencia(tipoOcorrenciaAtualizar: TipoOcorrenciaCreate): Observable<any> {
    return this.http.put(this.apiUrl + '/tipos-ocorrencias/' + tipoOcorrenciaAtualizar.id, tipoOcorrenciaAtualizar);
  }

  deletarTipoOcorrencia(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/tipos-ocorrencias/' + id);
  }

}
