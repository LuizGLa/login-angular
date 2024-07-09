import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../types/login-response';
import { tap } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private apiUrl = environment.backendUrl;

  constructor(private httpCliente: HttpClient, private authService: AuthService) { }

  login(username: string, password: string) {
    return this.httpCliente.post<LoginResponse>(`${this.apiUrl}/auth`, { username, password }).pipe(
      tap((value) => {
        this.authService.setToken(value.token, value.userId);
      })
    )
  }
}
