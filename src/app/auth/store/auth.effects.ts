import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import { environment } from "../../../environments/environment";
import { of } from "rxjs";
import { Injectable } from "@angular/core";
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

@Injectable()
export class AuthEffects {
  private signInUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=';
  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_START),
    switchMap((authData: AuthActions.SignInStart) => {
      return this.http.post<AuthResponseData>(
        this.signInUrl + environment.firebaseApiKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        map(resData => {
          const expirationDate = new Date(new Date().getTime() + (+resData.expiresIn * 1000));
          console.log('Observable with action: Sign in');
          // Map automatically returns an observable so no need for of()
          return new AuthActions.SignIn({email: resData.email, userId: resData.localId, token: resData.idtoken, expirationDate: expirationDate});
        }),
        catchError(errorRes => {
          // Does not automatically return observable, so use of()
          let errorMessage = 'An unknown error occurred!';
          if (!errorRes.error || !errorRes.error.error) {
            return of(new AuthActions.SignInFail(errorMessage));
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
          return of(new AuthActions.SignInFail(errorMessage));
        })
      );
    }),
  );

  @Effect({dispatch: false})
  authSuccess = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN),
    tap(() => {
      this.router.navigate(['/']);
    })
  );

  // You can add a $ after observables to show it is one.
  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private router: Router
  ) {}

  
}