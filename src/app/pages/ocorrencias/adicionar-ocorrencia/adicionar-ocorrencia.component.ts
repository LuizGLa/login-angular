import { Component, inject, OnInit } from '@angular/core';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Ocorrencia } from '../../../models/ocorrencia.model';
import { Rua } from '../../../models/rua.model'; // Atualize este import
import { TipoOcorrencia } from '../../../models/tipoOcorrencia.model'; // Atualize este import
import { OcorrenciaCreate } from '../../../models/ocorrenciaCreate.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-adicionar-ocorrencia',
  standalone: true,
  imports: [
    CardModulesComponent,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './adicionar-ocorrencia.component.html',
  styleUrls: ['./adicionar-ocorrencia.component.scss']
})
export class AdicionarOcorrenciaComponent implements OnInit {
  id!: string;
  ocorrencia!: Ocorrencia;
  usuario = sessionStorage.getItem('userId');
  isNovaOcorrencia: boolean = false;
  tituloPagina: string = '';
  rota: string = '';

  formCadastroOcorrencia!: FormGroup;
  ruas: Rua[] = [];
  tipoOcorrencias: TipoOcorrencia[] = [];

  constructor(
    private ocorrenciaService: OcorrenciaService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  toaster = inject(ToastrService)
  ngOnInit(): void {
    this.ocorrenciaService.getRuas().subscribe(
      ruas => {
        this.ruas = ruas;
      }
    );
    this.ocorrenciaService.getTipoOcorrencias().subscribe(
      tipoOcorrencias => {
        this.tipoOcorrencias = tipoOcorrencias;
      }
    );
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();

    if (this.rota === 'editar-ocorrencia') {
      this.tituloPagina = "Editar Ocorrência";
      this.id = this.activatedRoute.snapshot.params['id'];
      this.ocorrenciaService.getOcorrenciaPorId(this.id).subscribe(
        (ocorrencia: Ocorrencia) => {
          this.ocorrencia = ocorrencia;
          this.formCadastroOcorrencia.controls['titulo'].setValue(this.ocorrencia.titulo)
          this.formCadastroOcorrencia.controls['descricao'].setValue(this.ocorrencia.descricao)
          this.formCadastroOcorrencia.controls['localizacao'].setValue(this.ocorrencia.localizacao)
          this.formCadastroOcorrencia.controls['dataHora'].setValue(this.ocorrencia.dataHora)
          this.formCadastroOcorrencia.controls['latitude'].setValue(this.ocorrencia.latitude)
          this.formCadastroOcorrencia.controls['longitude'].setValue(this.ocorrencia.longitude)
          this.formCadastroOcorrencia.controls['rua'].setValue(this.ocorrencia.rua.id)
          this.formCadastroOcorrencia.controls['tipoOcorrencia'].setValue(this.ocorrencia.tipoOcorrencia.id)
        }
      );
    } else {
      this.isNovaOcorrencia = true;
      this.tituloPagina = "Adicionar Ocorrência";
    }
  }

  criarFormulario() {
    this.formCadastroOcorrencia = this.formBuilder.group({
      titulo: [''],
      descricao: [''],
      localizacao: [''],
      latitude: [''],
      longitude: [''],
      dataHora: [''],
      tipoOcorrencia: [''],
      rua: [''],
      usuario: Number(this.usuario)
    })
  }

  salvarOcorrencia(): void {
    const ocorrenciaCreate: OcorrenciaCreate = {
      id: this.isNovaOcorrencia ? undefined : Number(this.id),
      titulo: this.formCadastroOcorrencia.controls['titulo'].value,
      descricao: this.formCadastroOcorrencia.controls['descricao'].value,
      localizacao: this.formCadastroOcorrencia.controls['localizacao'].value,
      latitude: this.formCadastroOcorrencia.controls['latitude'].value,
      longitude: this.formCadastroOcorrencia.controls['longitude'].value,
      dataHora: this.formCadastroOcorrencia.controls['dataHora'].value,
      tipoOcorrencia: Number(this.formCadastroOcorrencia.controls['tipoOcorrencia'].value),
      rua: Number(this.formCadastroOcorrencia.controls['rua'].value),
      usuario: Number(this.usuario)
    }
    if (this.isNovaOcorrencia) {
      this.criarOcorrencia(ocorrenciaCreate);
    } else {
      this.atualizarOcorrencia(ocorrenciaCreate);
    }
  }

  criarOcorrencia(data: OcorrenciaCreate) {
    this.ocorrenciaService.criarOcorrencia(data).subscribe(response => {
      try {
        this.toaster.success('Ocorrência criada com sucesso!');
        this.router.navigate(['/ocorrencias']);
      } catch (e) {
        console.error('Erro ao redirecionar para a lista de ocorrências', e);
      }
    })
  }
  atualizarOcorrencia(data: OcorrenciaCreate) {
    this.ocorrenciaService.atualizarOcorrencia(data).subscribe(response => {
      try {
        this.toaster.success('Ocorrência atualizada com sucesso!');
        this.router.navigate(['/ocorrencias']);
      } catch (e) {
        console.error('Erro ao redirecionar para a lista de ocorrências', e);
      }
    })
  }
}
