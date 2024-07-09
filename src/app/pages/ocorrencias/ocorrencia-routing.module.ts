import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { OcorrenciasComponent } from './ocorrencia-listagem/ocorrencias.component';
import { AdicionarOcorrenciaComponent } from './adicionar-ocorrencia/adicionar-ocorrencia.component';



const routes: Routes = [
  { path: '', component: OcorrenciasComponent },
  { path: 'adicionar', component: AdicionarOcorrenciaComponent },
  // { path: 'editar-ocorrencia/:id', component: EditarOcorrenciaComponent },
  // { path: '**', component: NotFoundComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OcorrenciaRoutingModule { }
