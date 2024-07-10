import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TipoOcorrenciasComponent } from './tipo-ocorrencia-listagem/tipo-ocorrencias.component';
import { AdicionarTipoOcorrenciaComponent } from './adicionar-tipo-ocorrencia/adicionar-tipo-ocorrencia.component';



const routes: Routes = [
  { path: '', component: TipoOcorrenciasComponent },
  { path: 'adicionar', component: AdicionarTipoOcorrenciaComponent },
  { path: 'editar-tipo-ocorrencia/:id', component: AdicionarTipoOcorrenciaComponent },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TipoOcorrenciaRoutingModule { }
