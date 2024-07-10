import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoOcorrenciaCreate } from '../models/tipoOcorrenciaCreate.model';
import { Rua, Ruas } from '../models/rua.model';
import { RuaCreate } from '../models/ruaCreate';

@Injectable({
  providedIn: 'root'
})
export class RuaService {

  private apiUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }

  getRuas(): Observable<Ruas> {
    return this.http.get<Ruas>(this.apiUrl + '/ruas');
  }

  getRuaPorId(id: string): Observable<Rua> {
    return this.http.get<Rua>(this.apiUrl + '/ruas/' + id);
  }

  criarRua(ruaCreate: RuaCreate): Observable<any> {
    return this.http.post(this.apiUrl + '/ruas', ruaCreate);
  }

  atualizarRua(ruaAtualizar: RuaCreate): Observable<any> {
    return this.http.put(this.apiUrl + '/ruas/' + ruaAtualizar.id, ruaAtualizar);
  }

  deletarRua(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/ruas/' + id);
  }

}
