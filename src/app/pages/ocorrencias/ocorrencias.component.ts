import { Component } from '@angular/core';
import { CardModulesComponent } from '../../components/card-modules/card-modules.component';
import { TableComponentComponent } from '../../components/table-component/table-component.component';

@Component({
  selector: 'app-ocorrencias',
  standalone: true,
  imports: [
    CardModulesComponent,
    TableComponentComponent
  ],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.scss'
})
export class OcorrenciasComponent {

}
