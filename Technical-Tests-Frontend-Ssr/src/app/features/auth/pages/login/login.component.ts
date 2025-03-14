import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginFailed = false;

  constructor(private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      clientname: ['', Validators.required], // Requerido
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onLogin() {
    if (this.loginForm.invalid) {
      return;
    }

    const { clientname, password } = this.loginForm.value;
    if (clientname !== 'admin' || password !== '123456') {
      this.loginFailed = true; // Muestra el error
      this.loginForm.controls['clientname'].setErrors({ incorrect: true });
      this.loginForm.controls['password'].setErrors({ incorrect: true });
    } else {
      this.loginFailed = false;
      console.log('Login exitoso');
    }
  }
}