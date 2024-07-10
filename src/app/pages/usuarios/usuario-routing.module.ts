import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarUsuarioComponent } from './adicionar-usuario/adicionar-usuario.component';
import { UsuariosComponent } from './usuario-listagem/usuarios.component';



const routes: Routes = [
  { path: '', component: UsuariosComponent },
  { path: 'adicionar', component: AdicionarUsuarioComponent },
  { path: 'editar-usuario/:id', component: AdicionarUsuarioComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class usuarioRoutingModule { }
