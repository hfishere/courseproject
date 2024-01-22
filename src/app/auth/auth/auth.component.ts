import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthResponseData, AuthService } from './auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.less'
})

export class AuthComponent {
  private authService: AuthService;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  error: string = null;

  constructor() {
    this.authService = inject(AuthService);
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;
    }

    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true;

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password);
    } else {
      authObs = this.authService.signup(email, password);
    }

    authObs.subscribe(
      response => {
        console.log(response);
        this.isLoading = false;
      },
      errorMessage => {
        console.log(errorMessage)
        this.error = errorMessage;
        this.isLoading = false;
      }
    );

    form.reset();
  }
}
