import { Actions, ofType } from "@ngrx/effects";
import * as AuthActions from './auth.actions';

export class AuthEffects {
  authSignIn = this.actions$.pipe(
    ofType(AuthActions.SIGN_IN_START)
  );

  // You can add a $ after observables to show it is one.
  constructor(
    private actions$: Actions
  ) {}

  
}