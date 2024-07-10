import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private tokenKey = 'token';
  private userId = 'userId';

  constructor() { }

  setToken(token: string, userId: number): void {
    sessionStorage.setItem(this.tokenKey, token);
    sessionStorage.setItem(this.userId, userId.toString())
  }

  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    sessionStorage.removeItem(this.tokenKey);
    sessionStorage.removeItem(this.userId);
  }
}
