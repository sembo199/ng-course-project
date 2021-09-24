import { Action } from "@ngrx/store";
import { User } from "../user.model";

// Identifiers must be unique!
export const SIGN_IN_START = '[Auth] SIGN_IN_START';
export const SIGN_IN = '[Auth] SIGN_IN';
export const SIGN_IN_FAIL = '[Auth] SIGN_IN_FAIL'
export const SIGN_OUT = '[Auth] SIGN_OUT';

export class SignInStart implements Action {
  readonly type = SIGN_IN_START;

  constructor(public payload: { email: string, password: string }) {}
}

export class SignIn implements Action {
  readonly type = SIGN_IN;

  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date}) {}
}

export class SignInFail implements Action {
  readonly type = SIGN_IN_FAIL;

  constructor(public payload: string) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export type AuthActions = SignInStart | SignIn | SignInFail | SignOut;