import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { NavigationEnd, Router, RouterModule, RouterOutlet } from '@angular/router';
import { ToolbarComponent } from './components/home-components/toolbar/toolbar.component';
import { CommonModule } from '@angular/common';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { filter } from 'rxjs';
import { UsuarioService } from './services/usuario.service';
import { Usuario } from './models/usuario.model';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,
    CommonModule,
    ToolbarComponent,
    HttpClientModule,
    RouterModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  title = 'ocorre-map';
  user: any;
  userId: string | null = null;
  @ViewChild('sidenav') sidenav!: MatSidenav;

  constructor(
    private breakpointObserver: BreakpointObserver,
    public router: Router,
    private usuarioService: UsuarioService
  ) {
    if (typeof sessionStorage !== 'undefined') {
      this.userId = sessionStorage.getItem('userId');
    }
  }

  ngAfterViewInit(): void {
    this.breakpointObserver.observe([Breakpoints.Handset])
      .subscribe(result => {
        if (result.matches) {
          this.sidenav.mode = 'over';
          this.sidenav.close();
        } else {
          this.sidenav.mode = 'side';
          this.sidenav.open();
        }
      });

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      if (this.router.url === '/login') {
        this.sidenav.close();
      } else {
        this.sidenav.open();
      }
    });

    if (this.userId) {
      this.usuarioService.getUsuarioPorId(this.userId).subscribe(
        (usuario: any) => {
          this.user = usuario;
        },
        (error) => {
          console.error('Error fetching user details:', error);
        }
      );
    }
  }

  onToggleSidenav() {
    this.sidenav.toggle();
  }
}
