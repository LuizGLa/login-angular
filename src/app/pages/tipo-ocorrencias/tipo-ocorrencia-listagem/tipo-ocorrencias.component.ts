import { CommonModule } from "@angular/common";
import { CardModulesComponent } from "../../../components/card-modules/card-modules.component";
import { TableComponentComponent } from "../../../components/table-component/table-component.component";
import { MaterialModule } from "../../../shared/material/material.module";
import { Component, inject, OnInit } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from "@angular/material/table";
import { TipoOcorrenciaService } from "../../../services/tipo-ocorrencia.service";
import { Router } from "@angular/router";
import { TipoOcorrencia } from "../../../models/tipoOcorrencia.model";
import { TipoOcorrenciaCreate } from "../../../models/tipoOcorrenciaCreate.model";
import { ConfirmacaoComponent } from "../../../components/home-components/confirmacao/confirmacao.component";


interface TipoOcorrencias {
  descricao: string;
};
@Component({
  selector: 'app-tipo-ocorrencias',
  standalone: true,
  imports: [
    CardModulesComponent,
    TableComponentComponent,
    CommonModule,
    MaterialModule,
    ConfirmacaoComponent
  ],
  templateUrl: './tipo-ocorrencias.component.html',
  styleUrl: './tipo-ocorrencias.component.scss'
})
export class TipoOcorrenciasComponent implements OnInit {
  toaster = inject(ToastrService)
  readonly dialog = inject(MatDialog);
  nomeButtom = "Adicionar Tipo de Ocorrência";

  columns: string[] = ['descricao'];
  columnTitles: { [key: string]: string } = {
    descricao: 'Descrição',
  };


  dataSource: MatTableDataSource<TipoOcorrencias>;

  constructor(private tipoOcorrenciaService: TipoOcorrenciaService, public router: Router,) {
    this.dataSource = new MatTableDataSource<TipoOcorrencias>();
  }

  editTipoOcorrencia(tipoOcorrencia: TipoOcorrencia): void {
    this.router.navigate(['/tipo-ocorrencias/editar-tipo-ocorrencia', tipoOcorrencia.id]);
  }

  deleteTipoOcorrencia(tipoOcorrencia: TipoOcorrenciaCreate): void {
    const dialogRef = this.dialog.open(ConfirmacaoComponent, {
      width: '250px',
      data: 'Você tem certeza que deseja excluir este tipo de ocorrência? Ao deletar, todas as ocorrências relacionadas a este tipo serão excluídas.'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
      this.tipoOcorrenciaService.deletarTipoOcorrencia(tipoOcorrencia.id).subscribe(response => {
        this.toaster.success('Tipo de Ocorrência excluída com sucesso!');
        this.atualizarTipoOcorrencias();
      });
      }
    });

  }

  atualizarTipoOcorrencias(): void {
    this.tipoOcorrenciaService.getTipoOcorrencias().subscribe(
      tipoOcorrenciasResponse => {
        this.dataSource.data = tipoOcorrenciasResponse;
      }
    );
  }

  ngOnInit(): void {
    this.tipoOcorrenciaService.getTipoOcorrencias().subscribe(
      tipoOcorrencias => {
        this.dataSource.data = tipoOcorrencias;
      }
    );
  }

}

