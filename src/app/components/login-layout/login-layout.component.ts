import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-login-layout',
  standalone: true,
  imports: [
    MatIconModule,
    FormsModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatButtonModule
  ],
  templateUrl: './login-layout.component.html',
  styleUrl: './login-layout.component.scss'
})
export class LoginLayoutComponent {

  @Input() disablePrimaryButton: boolean = true;
  @Output("submit") onSubmit = new EventEmitter();
  @Output("navigate") onNavigate = new EventEmitter();

  submit() {
    this.onSubmit.emit();
  }

  navigate() {
    this.onNavigate.emit();
  }
}
