import { HttpClient } from "@angular/common/http";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { catchError, map, switchMap } from "rxjs/operators";
import * as AuthActions from './auth.actions';
import { environment } from "../../../environments/environment";
import { of } from "rxjs";
import { Injectable } from "@angular/core";

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
          return new AuthActions.SignIn({email: resData.email, userId: resData.localId, token: resData.idtoken, expirationDate: expirationDate});
        }),
        catchError(error => {
          // ...
          console.log("Error???");
          return of();
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