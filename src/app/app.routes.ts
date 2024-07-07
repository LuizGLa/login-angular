import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { HomeComponent } from './pages/home/home.component';
import { OcorrenciasComponent } from './pages/ocorrencias/ocorrencias.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'cadastrar',
    component: CadastrarComponent
  },
  {
    path: 'mapa',
    component: HomeComponent,
    resolve: { auth: AuthGuard }
  },
  {
    path: 'ocorrencias',
    component: OcorrenciasComponent,
    resolve: { auth: AuthGuard }
  },
  {
    path: '',
    redirectTo: '/mapa',
    pathMatch: 'full'
  }
];
