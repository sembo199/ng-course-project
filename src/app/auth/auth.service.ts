import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { ApiKeyService } from "./api-key.service";
import { User } from "./user.model";
import { Router } from "@angular/router";

export interface AuthResponseData {
  kind?: string;
  registered?: boolean;
  idtoken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

@Injectable({providedIn: 'root'})
export class AuthService {
  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  user = new BehaviorSubject<User>(null);

  constructor(
    private http: HttpClient,
    private apiKeyService: ApiKeyService,
    private router: Router
  ) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.signUpUrl + this.apiKeyService.getApiKey(),
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  signIn(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.signInUrl + this.apiKeyService.getApiKey(),
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  signOut() {
    this.user.next(null);
    this.router.navigate(['/auth']);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, userId, token, expirationDate);
    this.user.next(user);
  }

  private handleError(errorRes: HttpErrorResponse): Observable<any>{
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
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'There is no user record corresponding to this identifier. The user may have been deleted.';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = ' The password is invalid or the user does not have a password.';
            break;
          case 'USER_DISABLED':
            errorMessage = 'The user account has been disabled by an administrator.';
            break;
        }
        return throwError(errorMessage);
  }
}