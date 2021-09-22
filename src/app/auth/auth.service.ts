import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { ApiKeyService } from "./api-key.service";

interface AuthResponseData {
  kind: string;
  idtoken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';

  constructor(
    private http: HttpClient,
    private apiKeyService: ApiKeyService
  ) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.url + this.apiKeyService.getApiKey(),
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(
      catchError(errorRes => {
        let errorMessage = 'An unknown error occurred!';
        if (!errorRes.error || !errorRes.error.error) {
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'The email address is already in use by another account.';
            break;
          case 'OPERATION_NOT_ALLOWED':
            errorMessage = 'Password sign-in is disabled for this project.';
            break;
          case 'TOO_MANY_ATTEMPTS_TRY_LATER':
            errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';
            break;
          default:
            errorMessage = 'An error occurred!';
            break;
        }
        return throwError(errorMessage);
      })
    );
  }
}