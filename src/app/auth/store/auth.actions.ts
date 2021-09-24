import { Action } from "@ngrx/store";
import { User } from "../user.model";

// Identifiers must be unique!
export const SIGN_IN_START = '[Auth] SIGN_IN_START';
export const AUTHENTICATE_SUCCESS = '[Auth] AUTHENTICATE_SUCCESS';
export const AUTHENTICATE_FAIL = '[Auth] AUTHENTICATE_FAIL'
export const SIGN_UP_START = '[Auth] SIGN_UP_START';
export const SIGN_OUT = '[Auth] SIGN_OUT';

export class SignInStart implements Action {
  readonly type = SIGN_IN_START;

  constructor(public payload: { email: string, password: string }) {}
}

export class AuthenticateSuccess implements Action {
  readonly type = AUTHENTICATE_SUCCESS;

  constructor(public payload: {email: string, userId: string, token: string, expirationDate: Date}) {}
}

export class AuthenticateFail implements Action {
  readonly type = AUTHENTICATE_FAIL;

  constructor(public payload: string) {}
}

export class SignOut implements Action {
  readonly type = SIGN_OUT;
}

export class SignUpStart implements Action {
  readonly type = SIGN_UP_START;

  constructor(public payload: { email: string, password: string }) {}
}

export type AuthActions = SignInStart | AuthenticateSuccess | AuthenticateFail | SignUpStart | SignOut;