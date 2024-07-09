import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrenciaRoutingModule } from './ocorrencia-routing.module';
import { OcorrenciasComponent } from './ocorrencia-listagem/ocorrencias.component';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OcorrenciaRoutingModule,
    OcorrenciasComponent
  ]
})
export class OcorrenciaModule { }
