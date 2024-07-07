// auth.guard.ts
import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard {
  constructor(@Inject(PLATFORM_ID) private platformId: Object, private router: Router) { }

  canActivate(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      const token = sessionStorage.getItem('auth-token');
      if (!token) {
        this.router.navigate(['/login']);
        return false;
      }
    }
    return true;
  }
}
