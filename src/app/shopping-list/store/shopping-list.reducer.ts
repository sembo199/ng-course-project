import { Ingredient } from "../../shared/ingredient.model";
import * as shoppingListActions from './shopping-list.actions'

const initialState = {
  ingredients: [
    new Ingredient('Spaghetti', 1),
    new Ingredient('Pasta saus', 1),
    new Ingredient('Rundergehakt', 1)
  ]
};

export function shoppingListReducer(state = initialState, action: shoppingListActions.AddIngredient) {
  switch(action.type) {
    case shoppingListActions.ADD_INGREDIENT:
      return {
        ...state,
        ingredients: [...state.ingredients, action.payload]
      };
    default:
      return state;
  }
}