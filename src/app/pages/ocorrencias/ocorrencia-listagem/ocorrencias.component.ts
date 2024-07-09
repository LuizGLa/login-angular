import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CardModulesComponent } from '../../../components/card-modules/card-modules.component';
import { OcorrenciaService } from '../../../services/ocorrencia.service';
import { CommonModule } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';
import { MaterialModule } from '../../../shared/material/material.module';
import { TableComponentComponent } from '../../../components/table-component/table-component.component';
import { Rua, Ruas } from '../models/rua.model';

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

  ruas: Ruas = [];

  columnPipes: { [key: string]: { pipe: any, params: any[] } } = {
    dataHora: { pipe: 'date', params: ['dd/MM/yyyy HH:mm'] }
  };
  dataSource: MatTableDataSource<Ocorrencias>;

  constructor(private ocorrenciaService: OcorrenciaService) {
    this.dataSource = new MatTableDataSource<Ocorrencias>();
  }

  ngOnInit(): void {
    this.ocorrenciaService.getOcorrencias().subscribe(
      ocorrencias => {
        this.dataSource.data = ocorrencias;
      }
    );
    this.ocorrenciaService.getRuas().subscribe(
      ruas => {
        this.ruas = ruas;
      }
    );
  }
}
