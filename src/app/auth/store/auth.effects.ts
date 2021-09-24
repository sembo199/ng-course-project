import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import { environment } from "../../../environments/environment";
import { of } from "rxjs";

export interface AuthResponseData {
  kind?: string;
  registered?: boolean;
  idtoken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export class AuthEffects {
  private signUpUrl = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=';
  @Effect()
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_START),
    switchMap((authData: AuthActions.SignInStart) => {
      return this.http.post<AuthResponseData>(
        this.signUpUrl + environment.firebaseApiKey,
        {
          email: authData.payload.email,
          password: authData.payload.password,
          returnSecureToken: true
        }
      ).pipe(
        catchError(error => {
          // ...
          of();
        }),
        map(resData => {
          of();
        })
      );
    }),
  );

  // You can add a $ after observables to show it is one.
  constructor(
    private actions$: Actions,
    private http: HttpClient
  ) {}

  
}