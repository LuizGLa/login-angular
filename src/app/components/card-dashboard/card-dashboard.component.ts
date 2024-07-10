import { Component, Input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-card-dashboard',
  standalone: true,
  imports: [MatIconModule],
  templateUrl: './card-dashboard.component.html',
  styleUrls: ['./card-dashboard.component.scss']
})
export class CardDashboardComponent {
  @Input() icon!: string;
  @Input() name!: string;
  @Input() value!: number;
  @Input() bgCard!: string;
}
