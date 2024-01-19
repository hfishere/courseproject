import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { catchError, switchScan, throwError } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private httpClient: HttpClient;

  constructor() {
    this.httpClient = inject(HttpClient);
  }

  signup(email: string, password: string) {
    return this.httpClient
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAjGenKdEd72j41pD_wXtxzUrobZ-roKqg',
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError((errorResponse) => {
          let errorMessage = 'An Unknown Error Occurred';

          if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage);
          }

          switch (errorResponse.error.error.message) {
            case 'EMAIL_EXISTS':
              errorMessage = 'Email already exists';
          }

          return throwError(errorMessage);
        })
      );
  }
}
