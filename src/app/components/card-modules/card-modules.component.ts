import { Component, Input } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-modules',
  standalone: true,
  imports: [
    MatIconModule,
    ReactiveFormsModule
  ],
  templateUrl: './card-modules.component.html',
  styleUrl: './card-modules.component.scss'
})
export class CardModulesComponent {

  @Input() title!: string;
  @Input() icon!: string;
}
