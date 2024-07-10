import { Component, inject, OnInit } from '@angular/core';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TipoOcorrencia } from '../../../models/tipoOcorrencia.model';
import { TipoOcorrenciaService } from '../../../services/tipo-ocorrencia.service';
import { ToastrService } from 'ngx-toastr';
import { TipoOcorrenciaCreate } from '../../../models/tipoOcorrenciaCreate.model';

@Component({
  selector: 'app-adicionar-tipo-ocorrencia',
  standalone: true,
  imports: [
    CardModulesComponent,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './adicionar-tipo-ocorrencia.component.html',
  styleUrl: './adicionar-tipo-ocorrencia.component.scss'
})
export class AdicionarTipoOcorrenciaComponent implements OnInit {
  id!: string;
  tipoOcorrencia!: TipoOcorrencia;
  isNovoTipoOcorrencia: boolean = false;
  tituloPagina: string = '';
  rota: string = '';

  formCadastroOcorrencia!: FormGroup;
  constructor(
    private tipoOcorrenciaService: TipoOcorrenciaService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  toaster = inject(ToastrService)

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();

    if (this.rota === 'editar-tipo-ocorrencia') {
      this.tituloPagina = "Editar Ocorrência";
      this.id = this.activatedRoute.snapshot.params['id'];
      this.tipoOcorrenciaService.getTipoOcorrenciaPorId(this.id).subscribe(
        (tipoOcorrencia: TipoOcorrencia) => {
          this.tipoOcorrencia = tipoOcorrencia;
          this.formCadastroOcorrencia.controls['descricao'].setValue(this.tipoOcorrencia.descricao)
        }
      );
    } else {
      this.isNovoTipoOcorrencia = true;
      this.tituloPagina = "Adicionar Tipo de Ocorrência";
    }
  }

  criarFormulario() {
    this.formCadastroOcorrencia = this.formBuilder.group({
      descricao: [''],
    })
  }

  salvarTipoOcorrencia(): void {
    const tipoOcorrenciaCreate: TipoOcorrenciaCreate = {
      id: this.isNovoTipoOcorrencia ? undefined : Number(this.id),
      descricao: this.formCadastroOcorrencia.controls['descricao'].value,
    }
    if (this.isNovoTipoOcorrencia) {
      this.criarTipoOcorrencia(tipoOcorrenciaCreate);
    } else {
      this.atualizarTipoOcorrencia(tipoOcorrenciaCreate);
    }
  }

  criarTipoOcorrencia(data: TipoOcorrenciaCreate) {
    this.tipoOcorrenciaService.criarTipoOcorrencia(data).subscribe(response => {
      try {
        this.toaster.success('Tipo de Ocorrência criada com sucesso!');
        this.router.navigate(['/tipo-ocorrencias']);
      } catch (e) {
        console.error('Erro ao redirecionar para a lista de tipos de ocorrências', e);
      }
    })
  }
  atualizarTipoOcorrencia(data: TipoOcorrenciaCreate) {
    this.tipoOcorrenciaService.atualizarTipoOcorrencia(data).subscribe(response => {
      try {
        this.toaster.success('Tipo de Ocorrência atualizada com sucesso!');
        this.router.navigate(['/tipo-ocorrencias']);
      } catch (e) {
        console.error('Erro ao redirecionar para a lista de tipos de ocorrências', e);
      }
    })
  }

}


