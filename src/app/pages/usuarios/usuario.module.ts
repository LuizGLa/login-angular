import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { usuarioRoutingModule } from './usuario-routing.module';
import { UsuariosComponent } from './usuario-listagem/usuarios.component';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    usuarioRoutingModule,
    UsuariosComponent,
    ReactiveFormsModule,
  ],
})
export class UsuarioModule { }
