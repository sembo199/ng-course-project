import { Action } from '@ngrx/store';
import { Recipe } from '../recipe.model';

export const GET_RECIPES = '[Recipes] GET_RECIPES';
export const SET_RECIPES = '[Recipes] SET_RECIPES';
export const ADD_RECIPE = '[Recipes] ADD_RECIPE';
export const UPDATE_RECIPE = '[Recipes] UPDATE_RECIPE';
export const DELETE_RECIPE = '[Recipes] DELETE_RECIPE';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export type RecipeActions = SetRecipes;