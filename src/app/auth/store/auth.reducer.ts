import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
}

const initialState = {
  user: null
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  console.log(action);
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
      /** IMPORTANT:
       * 
       *  This code will run the first time, so setting the state in the default case is important!
       *  Any action you dispatch reaches all reducers.
       *  This has an important implication: 
       *    - Always copy the initial state with ...state.
       *    - Return default state.
       */
      return state;
  }
}