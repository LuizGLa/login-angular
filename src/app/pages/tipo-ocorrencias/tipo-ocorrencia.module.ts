import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TipoOcorrenciasComponent } from './tipo-ocorrencia-listagem/tipo-ocorrencias.component';
import { TipoOcorrenciaRoutingModule } from './tipo-ocorrencia-routing.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TipoOcorrenciaRoutingModule,
    TipoOcorrenciasComponent,
    ReactiveFormsModule,
  ],
})
export class TipoOcorrenciaModule { }
