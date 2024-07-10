import { Component, inject, OnInit } from '@angular/core';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { TableComponentComponent } from '../../../components/table-component/table-component.component';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../../../shared/material/material.module';
import { ConfirmacaoComponent } from '../../../components/home-components/confirmacao/confirmacao.component';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { RuaService } from '../../../services/rua.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Rua } from '../../../models/rua.model';
import { RuaCreate } from '../../../models/ruaCreate';

interface Ruas {
  nome: string;
};
@Component({
  selector: 'app-ruas',
  standalone: true,
  imports: [
    CardModulesComponent,
    TableComponentComponent,
    CommonModule,
    MaterialModule,
    ConfirmacaoComponent
  ],
  templateUrl: './ruas.component.html',
  styleUrl: './ruas.component.scss'
})

export class RuasComponent implements OnInit {
  toaster = inject(ToastrService)
  readonly dialog = inject(MatDialog);
  nomeButtom = "Adicionar Rua";

  columns: string[] = ['nome'];
  columnTitles: { [key: string]: string } = {
    descricao: 'nome',
  };


  dataSource: MatTableDataSource<Ruas>;

  constructor(private ruaService: RuaService, public router: Router,) {
    this.dataSource = new MatTableDataSource<Ruas>();
  }

  editRua(rua: Rua): void {
    this.router.navigate(['/ruas/editar-rua', rua.id]);
  }

  deleteRua(rua: RuaCreate): void {
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      width: '250px',
      data: 'Você tem certeza que deseja excluir esta rua? Ao deletar, todas as ocorrências relacionadas a esta rua serão excluídas.'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ruaService.deletarRua(rua.id).subscribe(response => {
          this.toaster.success('Rua excluída com sucesso!');
          this.atualizarRuas();
        });
      }
    });

  }

  atualizarRuas(): void {
    this.ruaService.getRuas().subscribe(
      ruasResponse => {
        this.dataSource.data = ruasResponse;
      }
    );
  }

  ngOnInit(): void {
    this.ruaService.getRuas().subscribe(
      ruas => {
        this.dataSource.data = ruas;
      }
    );
  }

}
