import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { RuasComponent } from './rua-listagem/ruas.component';
import { AdicionarRuaComponent } from './adicionar-rua/adicionar-rua.component';



const routes: Routes = [
  { path: '', component: RuasComponent },
  { path: 'adicionar', component: AdicionarRuaComponent },
  { path: 'editar-rua/:id', component: AdicionarRuaComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuaRoutingModule { }
