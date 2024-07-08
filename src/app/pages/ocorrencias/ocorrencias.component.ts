import { Component } from '@angular/core';
import { CardModulesComponent } from '../../components/card-modules/card-modules.component';

@Component({
  selector: 'app-ocorrencias',
  standalone: true,
  imports: [
    CardModulesComponent
  ],
  templateUrl: './ocorrencias.component.html',
  styleUrl: './ocorrencias.component.scss'
})
export class OcorrenciasComponent {

}
