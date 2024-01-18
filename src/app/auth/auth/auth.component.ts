import { Component, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';

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

    if (this.isLoginMode) {
      // do something
    } else {
      this.authService.signup(email, password).subscribe(
        response => {
          console.log(response);
          this.isLoading = false;
        },
        error => {
          this.error = 'An error occured!';
          this.isLoading = false;
        }
      );
    }

    form.reset();
  }
}
