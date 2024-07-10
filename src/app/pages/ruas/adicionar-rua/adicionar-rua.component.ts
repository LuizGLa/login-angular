import { Component, inject, OnInit } from '@angular/core';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Rua } from '../../../models/rua.model';
import { RuaService } from '../../../services/rua.service';
import { ToastrService } from 'ngx-toastr';
import { RuaCreate } from '../../../models/ruaCreate';

@Component({
  selector: 'app-adicionar-rua',
  standalone: true,
  imports: [
    CardModulesComponent,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './adicionar-rua.component.html',
  styleUrl: './adicionar-rua.component.scss'
})
export class AdicionarRuaComponent implements OnInit {
  id!: string;
  rua!: Rua;
  isNovaRua: boolean = false;
  tituloPagina: string = '';
  rota: string = '';

  formCadastroRua!: FormGroup;
  constructor(
    private ruaService: RuaService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  toaster = inject(ToastrService)

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();

    if (this.rota === 'editar-rua') {
      this.tituloPagina = "Editar Rua";
      this.id = this.activatedRoute.snapshot.params['id'];
      this.ruaService.getRuaPorId(this.id).subscribe(
        (rua: Rua) => {
          this.rua = rua;
          this.formCadastroRua.controls['nome'].setValue(this.rua.nome)
        }
      );
    } else {
      this.isNovaRua = true;
      this.tituloPagina = "Adicionar Rua";
    }
  }

  criarFormulario() {
    this.formCadastroRua = this.formBuilder.group({
      nome: [''],
    })
  }

  salvarRua(): void {
    const ruaCreate: RuaCreate = {
      id: this.isNovaRua ? undefined : Number(this.id),
      nome: this.formCadastroRua.controls['nome'].value,
    }
    if (this.isNovaRua) {
      this.criarRua(ruaCreate);
    } else {
      this.atualizarRua(ruaCreate);
    }
  }

  criarRua(data: RuaCreate) {
    this.ruaService.criarRua(data).subscribe(response => {
      try {
        this.toaster.success('Rua criada com sucesso!');
        this.router.navigate(['/ruas']);
      } catch (e) {
        this.toaster.error('Erro ao criar rua');
        console.error('Erro ao redirecionar para a lista de ruas', e);
      }
    })
  }
  atualizarRua(data: RuaCreate) {
    this.ruaService.atualizarRua(data).subscribe(response => {
      try {
        this.toaster.success('Rua atualizada com sucesso!');
        this.router.navigate(['/ruas']);
      } catch (e) {
        this.toaster.error('Erro ao atualizar rua');
        console.error('Erro ao redirecionar para a lista de ruas', e);
      }
    })
  }



}
