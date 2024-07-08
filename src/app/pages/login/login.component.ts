import { Component, inject } from '@angular/core';
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
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-cadastrar',
  standalone: true,
  imports: [

    LoginLayoutComponent, MatIconModule, FormsModule, MatFormFieldModule, MatInputModule, MatDividerModule, MatButtonModule, ReactiveFormsModule, InputLoginComponent
  ],
  providers: [
    LoginService
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup;
  toaster = inject(ToastrService)

  constructor(
    private router: Router,
    private loginService: LoginService
  ) {

    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });

  }

  submit() {
    console.log(this.loginForm)
    this.loginService.login(this.loginForm.value.username, this.loginForm.value.password).subscribe({
      next: () => {
        this.router.navigate(['/mapa']);
      },
      error: (error) => {
        console.error(error);
        this.toaster.error('Usuário ou senha inválidos!')
      }
    });
  }
  navigate() {
    this.router.navigate(['cadastrar']);
  }

}
