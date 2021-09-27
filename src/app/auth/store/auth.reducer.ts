import { User } from "../user.model";
import * as AuthActions from "./auth.actions";

export interface State {
  user: User;
  authError: string;
  loading: boolean;
}

const initialState: State = {
  user: null,
  authError: null,
  loading: false
}

export function authReducer(state = initialState, action: AuthActions.AuthActions) {
  // console.log(action);
  switch(action.type) {
    case AuthActions.AUTHENTICATE_SUCCESS:
      const user = new User(
        action.payload.email,
        action.payload.userId,
        action.payload.token,
        action.payload.expirationDate
      );
      return {
        ...state,
        authError: null,
        user,
        loading: false
      };
    case AuthActions.SIGN_OUT:
      return {
        ...state,
        user: null
      };
    case AuthActions.SIGN_IN_START:
    case AuthActions.SIGN_UP_START:
      return {
        ...state,
        authError: null,
        loading: true
      };
    case AuthActions.AUTHENTICATE_FAIL:
      return {
        ...state,
        user: null,
        authError: action.payload,
        loading: false
      }
    case AuthActions.CLEAR_ERROR:
      return {
        ...state,
        authError: null
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