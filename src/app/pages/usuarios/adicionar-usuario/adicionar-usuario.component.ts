import { Component, inject } from '@angular/core';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Usuario } from '../../../models/usuario.model';
import { UsuarioService } from '../../../services/usuario.service';
import { ToastrService } from 'ngx-toastr';
import { UsuarioCreate } from '../../../models/usuarioCreate';

@Component({
  selector: 'app-adicionar-usuario',
  standalone: true,
  imports: [
    CardModulesComponent,
    CommonModule,
    MaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './adicionar-usuario.component.html',
  styleUrl: './adicionar-usuario.component.scss'
})
export class AdicionarUsuarioComponent {
  id!: string;
  usuario!: Usuario;
  isNovoUsuario: boolean = false;
  tituloPagina: string = '';
  rota: string = '';

  formCadastroUsuario!: FormGroup;
  constructor(
    private usuarioService: UsuarioService,
    private activatedRoute: ActivatedRoute,
    public router: Router,
    private formBuilder: FormBuilder
  ) { }

  toaster = inject(ToastrService)

  ngOnInit(): void {
    this.rota = this.activatedRoute.snapshot.url[0].path;
    this.criarFormulario();

    if (this.rota === 'editar-usuario') {
      this.tituloPagina = "Editar Usuário";
      this.id = this.activatedRoute.snapshot.params['id'];
      this.usuarioService.getUsuarioPorId(this.id).subscribe(
        (usuario: Usuario) => {
          this.usuario = usuario;
          this.formCadastroUsuario.controls['name'].setValue(this.usuario.name)
          this.formCadastroUsuario.controls['username'].setValue(this.usuario.username)
        }
      );
    } else {
      this.isNovoUsuario = true;
      this.tituloPagina = "Adicionar Usuario";
    }
  }

  criarFormulario() {
    this.formCadastroUsuario = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      username: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    })
  }

  salvarUsuario(): void {
    if (this.formCadastroUsuario.controls['password'].invalid) {
      this.toaster.error('A senha deve ter pelo menos 6 caracteres');
      return;
    }

    if (this.formCadastroUsuario.controls['username'].invalid) {
      this.toaster.error('O formato de email informado é inválido');
      return;
    }



    const usuarioCreate: UsuarioCreate = {
      id: this.isNovoUsuario ? undefined : Number(this.id),
      name: this.formCadastroUsuario.controls['name'].value,
      username: this.formCadastroUsuario.controls['username'].value,
      password: this.formCadastroUsuario.controls['password'].value,
    }

    if (this.isNovoUsuario) {
      this.criarUsuario(usuarioCreate);
    } else {
      this.atualizarUsuario(usuarioCreate);
    }
  }


  criarUsuario(data: UsuarioCreate) {
    this.usuarioService.criarUsuario(data).subscribe(response => {
      try {
        this.toaster.success('Usuario criado com sucesso!');
        this.router.navigate(['/usuarios']);
      } catch (e) {
        this.toaster.error('Erro ao criar usuario');
        console.error('Erro ao redirecionar para a lista de usuarios', e);
      }
    })
  }

  atualizarUsuario(data: UsuarioCreate) {
    this.usuarioService.atualizarUsuario(data).subscribe(response => {
      try {
        this.toaster.success('Usuario atualizado com sucesso!');
        this.router.navigate(['/usuarios']);
      } catch (e) {
        this.toaster.error('Erro ao atualizar usuario');
        console.error('Erro ao redirecionar para a lista de usuarios', e);
      }
    })
  }


}
