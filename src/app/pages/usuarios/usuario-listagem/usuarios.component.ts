import { Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { UsuarioService } from '../../../services/usuario.service';
import { Usuario } from '../../../models/usuario.model';
import { Router } from '@angular/router';
import { UsuarioCreate } from '../../../models/usuarioCreate';
import { ConfirmacaoComponent } from '../../../components/home-components/confirmacao/confirmacao.component';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { TableComponentComponent } from '../../../components/table-component/table-component.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';

interface Usuarios {
  name: string;
  username: string;
  password: string;
}

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [
    CardModulesComponent,
    TableComponentComponent,
    CommonModule,
    MaterialModule,
    ConfirmacaoComponent
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.scss'
})


export class UsuariosComponent implements OnInit {
  toaster = inject(ToastrService);
  readonly dialog = inject(MatDialog);
  nomeButtom = "Adicionar Usuário";

  columns: string[] = ['name', 'username', 'role'];

  columnTitles: { [key: string]: string } = {
    name: 'Nome',
    username: 'Email',
    role: 'Nível'
  };

  dataSource: MatTableDataSource<Usuarios>;

  constructor(private usuarioService: UsuarioService, public router: Router) {
    this.dataSource = new MatTableDataSource<Usuarios>();
  }

  editUsuario(usuario: Usuario): void {
    this.router.navigate(['/usuarios/editar-usuario', usuario.id]);
  }

  deleteUsuario(usuario: UsuarioCreate): void {
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      width: '250px',
      data: 'Você tem certeza que deseja excluir este usuário? Ao deletar, todas as ocorrências relacionadas a este usuário serão excluídas.'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.usuarioService.deletarUsuario(usuario.id).subscribe(response => {
          this.toaster.success('Usuário excluída com sucesso!');
          this.atualizarUsuarios();
        });
      }
    });
  }

  atualizarUsuarios(): void {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        this.dataSource.data = usuarios;
      }
    );
  }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(
      usuarios => {
        this.dataSource.data = usuarios;
      }
    );
  }

}
