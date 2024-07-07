import { Component } from '@angular/core';
import { ToolbarComponent } from '../../components/home-components/toolbar/toolbar.component';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ToolbarComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
