import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
}

const initialState = {
  user: null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  switch(action.type) {
    case AuthActions.SIGN_IN:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        user
      };
    case AuthActions.SIGN_OUT:
      return {
        ...state,
        user: null
      };
    default: 
      return state;
  }
}