import { Component, OnInit } from '@angular/core';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormsModule } from '@angular/forms';
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Ocorrencia } from '../models/ocorrencia.model';

@Component({
  selector: 'app-adicionar-ocorrencia',
  standalone: true,
  imports: [
    CardModulesComponent,
    CommonModule,
    MaterialModule,
    FormsModule
  ],
  templateUrl: './adicionar-ocorrencia.component.html',
  styleUrl: './adicionar-ocorrencia.component.scss'
})
export class AdicionarOcorrenciaComponent implements OnInit {
  id!: string;
  ocorrencia!: Ocorrencia;
  titulo: string = '';
  descricao: string = '';
  localizacao: string = '';
  dataHora: Date = new Date();
  latitude: string = '';
  longitude: string = '';
  tituloPagina: string = '';
  rota: string = '';
  isNovaOcorrencia: boolean = false;

  constructor(private ocorrenciaService: OcorrenciaService,
    private activatedRoute: ActivatedRoute,
    private router: Router,) { }

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path
    if (this.rota === 'editar') {
      this.tituloPagina = "Adicionar Ocorrência"
      this.id = this.activatedRoute.snapshot.params['id']
      this.ocorrenciaService.getOcorrenciaPorId(this.id).subscribe(
        (ocorrencia: Ocorrencia) => {
          // this.id = produto.id;
          this.ocorrencia = ocorrencia;
          this.titulo = this.ocorrencia.titulo;
          this.descricao = this.ocorrencia.descricao;
          this.localizacao = this.ocorrencia.localizacao;
          this.dataHora = this.ocorrencia.dataHora;
          this.latitude = this.ocorrencia.latitude;
          this.longitude = this.ocorrencia.longitude;
        })
    } else {
      this.isNovaOcorrencia = true;
      this.tituloPagina = "Adicionar produto"
    }
  }


}
