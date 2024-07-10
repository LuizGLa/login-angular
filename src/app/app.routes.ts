import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastrarComponent } from './pages/cadastrar/cadastrar.component';
import { HomeComponent } from './pages/home/home.component';
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
    loadChildren: () => import('./pages/ocorrencias/ocorrencia.module').then(m => m.OcorrenciaModule),
    resolve: { auth: AuthGuard }
  },
  {
    path: 'tipo-ocorrencias',
    loadChildren: () => import('./pages/tipo-ocorrencias/tipo-ocorrencia.module').then(m => m.TipoOcorrenciaModule),
    resolve: { auth: AuthGuard }
  },
  {
    path: '',
    redirectTo: '/mapa',
    pathMatch: 'full'
  }
];
