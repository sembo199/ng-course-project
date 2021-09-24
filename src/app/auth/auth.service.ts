import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, tap } from "rxjs/operators";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { ApiKeyService } from "./api-key.service";
import { User } from "./user.model";
import { Router } from "@angular/router";
import { environment } from '../../environments/environment';
import { Store } from "@ngrx/store";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

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
  // user = new BehaviorSubject<User>(null);
  private tokenExpirationTimer: any;

  constructor(
    private http: HttpClient,
    private apiKeyService: ApiKeyService,
    private router: Router,
    private store: Store<fromApp.AppState>
  ) {}

  signUp(email: string, password: string) {
    return this.http.post<AuthResponseData>(
      this.signUpUrl + environment.firebaseApiKey,
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
      this.signInUrl + environment.firebaseApiKey,
      {
        email,
        password,
        returnSecureToken: true
      }
    ).pipe(catchError(this.handleError), tap(resData => {
      this.handleAuthentication(resData.email, resData.localId, resData.idToken, resData.expiresIn);
    }));
  }

  autoLogin() {
    const userData: {
      email: string,
      id: string,
      _token: string,
      _tokenExpirationDate: string
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new User(userData.email, userData.id, userData._token, new Date(userData._tokenExpirationDate));
    if (loadedUser.token) {
      // this.user.next(loadedUser);
      const expirationDuration = new Date(userData._tokenExpirationDate).getTime() - new Date().getTime();
      this.store.dispatch(new AuthActions.AuthenticateSuccess({email: loadedUser.email, userId: loadedUser.id, token: loadedUser.token, expirationDate: new Date(userData._tokenExpirationDate)}))
      this.autoSignOut(expirationDuration);
    }
  }

  signOut() {
    // this.user.next(null);
    this.store.dispatch(new AuthActions.SignOut());
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }
    this.tokenExpirationTimer = null;
  }

  autoSignOut(expirationDuration: number) {
    console.log(expirationDuration);
    this.tokenExpirationTimer = setTimeout(() => {
      this.signOut();
    }, expirationDuration);
  }

  private handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + (expiresIn * 1000));
    const user = new User(email, userId, token, expirationDate);
    // this.user.next(user);
    this.store.dispatch(new AuthActions.AuthenticateSuccess({email, userId, token, expirationDate}));
    this.autoSignOut(expiresIn * 1000);
    // Store token in storage
    localStorage.setItem('userData', JSON.stringify(user));
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