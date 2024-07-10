import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shared/material/material.module';
import { TableComponentComponent } from '../../../components/table-component/table-component.component';
import { Ocorrencia } from '../../../models/ocorrencia.model';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OcorrenciaCreate } from '../../../models/ocorrenciaCreate.model';
import { ConfirmacaoComponent } from '../../../components/home-components/confirmacao/confirmacao.component';

interface Ocorrencias {
  titulo: string;
  descricao: string;
  localizacao: string;
  dataHora: Date;
  rua: {
    id: number;
    nome: string;
  };
  usuario: {
    name: string;
  }
}

@Component({
  selector: 'app-ocorrencias',
  standalone: true,
  imports: [
    CardModulesComponent,
    TableComponentComponent,
    CommonModule,
    MaterialModule,
  ],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.scss'
})

export class OcorrenciasComponent implements OnInit {
  toaster = inject(ToastrService);
  readonly dialog = inject(MatDialog);
  nomeButtom = "Adicionar Ocorrência";

  columns: string[] = ['titulo', 'descricao', 'localizacao', 'dataHora', 'rua.nome', 'usuario.name'];

  columnTitles: { [key: string]: string } = {
    titulo: 'Título',
    descricao: 'Descrição',
    localizacao: 'Localização',
    dataHora: 'Data e Hora',
    'rua.nome': 'Rua',
    'usuario.name': 'Usuário'
  };

  columnPipes: { [key: string]: { pipe: any, params: any[] } } = {
    dataHora: { pipe: 'date', params: ['dd/MM/yyyy HH:mm'] }
  };

  dataSource: MatTableDataSource<Ocorrencias>;

  constructor(private ocorrenciaService: OcorrenciaService, public router: Router) {
    this.dataSource = new MatTableDataSource<Ocorrencias>();
  }

  editOcorrencia(ocorrencia: Ocorrencia): void {
    this.router.navigate(['/ocorrencias/editar-ocorrencia', ocorrencia.id]);
  }

  deleteOcorrencia(ocorrencia: OcorrenciaCreate): void {
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      width: '250px',
      data: 'Você tem certeza que deseja excluir esta ocorrência?'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.ocorrenciaService.deletarOcorrencia(ocorrencia.id).subscribe(response => {
          this.toaster.success('Ocorrência excluída com sucesso!');
          this.atualizarOcorrencias(); // Chama a função para atualizar a lista
        });
      }
    });
  }

  atualizarOcorrencias(): void {
    this.ocorrenciaService.getOcorrencias().subscribe(
      ocorrencias => {
        this.dataSource.data = ocorrencias;
      }
    );
  }

  ngOnInit(): void {
    this.ocorrenciaService.getOcorrencias().subscribe(
      ocorrencias => {
        this.dataSource.data = ocorrencias;
      }
    );
  }
}
