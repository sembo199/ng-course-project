import { Action } from "@ngrx/store";
import { User } from "../user.model";

export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date}) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export type AuthActions = SignIn | SignOut;