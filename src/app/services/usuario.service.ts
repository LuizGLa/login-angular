import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { TipoOcorrenciaCreate } from '../models/tipoOcorrenciaCreate.model';
import { Rua, Ruas } from '../models/rua.model';
import { RuaCreate } from '../models/ruaCreate';
import { Usuario, Usuarios } from '../models/usuario.model';
import { UsuarioCreate } from '../models/usuarioCreate';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private apiUrl = environment.backendUrl;


  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.apiUrl + '/usuarios');
  }

  getUsuarioPorId(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(this.apiUrl + '/usuarios/' + id);
  }

  criarUsuario(usuarioCreate: UsuarioCreate): Observable<any> {
    return this.http.post(this.apiUrl + '/usuarios', usuarioCreate);
  }

  atualizarUsuario(usuarioAtualizar: UsuarioCreate): Observable<any> {
    return this.http.put(this.apiUrl + '/usuarios/' + usuarioAtualizar.id, usuarioAtualizar);
  }

  deletarUsuario(id: any): Observable<any> {
    return this.http.delete(this.apiUrl + '/usuarios/' + id);
  }

}
