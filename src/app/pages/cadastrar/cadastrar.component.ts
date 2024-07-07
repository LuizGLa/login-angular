import { Component } from '@angular/core';
import { LoginLayoutComponent } from '../../components/login-layout/login-layout.component';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { InputLoginComponent } from '../../components/input-login/input-login.component';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [

    LoginLayoutComponent, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatButtonModule, ReactiveFormsModule, InputLoginComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './cadastrar.component.html',
  styleUrl: './cadastrar.component.scss'
})
export class CadastrarComponent {
  cadastrarForm!: FormGroup;

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {

    this.cadastrarForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      passwordConfirm: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });

  }

  submit() {
    console.log(this.cadastrarForm)
    this.loginService.login(this.cadastrarForm.value.username, this.cadastrarForm.value.password).subscribe({
      next: () => {
        this.router.navigate(['mapa']);
      },
      error: (error) => {
        console.error(error);
      }
    });
  }
  navigate() {
    this.router.navigate(['login']);
  }

}
