import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.backendUrl;

  constructor(private httpCliente: HttpClient) { }

  login(username: string, password: string) {
    return this.httpCliente.post<LoginResponse>(`${this.apiUrl}/auth`, { username, password }).pipe(
      tap((value) => {
        sessionStorage.setItem('token', value.token);
      })
    )
  }
}
