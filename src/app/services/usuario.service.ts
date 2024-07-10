import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from '../../environments/environment';
import { Usuario, Usuarios } from '../models/usuario.model';
import { UsuarioCreate } from '../models/usuarioCreate';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private apiUrl = environment.backendUrl;
  private usuarioSubject = new BehaviorSubject<Usuario | null>(null);
  usuario$ = this.usuarioSubject.asObservable();

  constructor(private http: HttpClient) { }

  getUsuarios(): Observable<Usuarios> {
    return this.http.get<Usuarios>(this.apiUrl + '/usuarios');
  }

  // Mantém a função original para retornar Observable
  getUsuarioPorId(id: string): Observable<Usuario> {
    const usuarioObservable = this.http.get<Usuario>(this.apiUrl + '/usuarios/' + id);
    usuarioObservable.subscribe(
      (usuario: Usuario) => {
        this.usuarioSubject.next(usuario);
      },
      (error) => {
        console.error('Error fetching user details:', error);
      }
    );
    return usuarioObservable;
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
