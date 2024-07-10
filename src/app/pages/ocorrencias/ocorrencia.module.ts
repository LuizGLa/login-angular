import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OcorrenciaRoutingModule } from './ocorrencia-routing.module';
import { OcorrenciasComponent } from './ocorrencia-listagem/ocorrencias.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    OcorrenciaRoutingModule,
    OcorrenciasComponent,
    ReactiveFormsModule
  ]
})
export class OcorrenciaModule { }
