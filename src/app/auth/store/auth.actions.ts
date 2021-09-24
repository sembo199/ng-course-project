import { Action } from "@ngrx/store";
import { User } from "../user.model";

// Identifiers must be unique!
export const SIGN_IN = '[Auth] SIGN_IN';
export const SIGN_OUT = '[Auth] SIGN_OUT';

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date}) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export type AuthActions = SignIn | SignOut;