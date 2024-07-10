import { Component, EventEmitter, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';

@Component({
  selector: 'app-toolbar',
  standalone: true,
  imports: [
    MatToolbarModule, MatButtonModule, MatIconModule, RouterModule
  ],
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  @Output() toggleSidenav = new EventEmitter<void>();

  constructor(private authService: AuthService, private router: Router) { }

  onToggleSidenav() {
    this.toggleSidenav.emit();
  }

  logout() {
    this.authService.clearToken(); // Clear token from session storage
    this.router.navigate(['/login']); // Navigate to the login page
  }

}
