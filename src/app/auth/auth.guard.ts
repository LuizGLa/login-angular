import { Injectable } from '@angular/core';
import { Resolve, Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements Resolve<boolean> {

  constructor(private router: Router) { }

  resolve(): Observable<boolean> {
    if (typeof sessionStorage !== 'undefined') {
      const token = sessionStorage.getItem('token');
      if (token) {
        return of(true);
      } else {
        this.router.navigate(['/login']);
        return of(false);
      }
    } else {
      this.router.navigate(['/login']);
      return of(false);
    }
  }
}
