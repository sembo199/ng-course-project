import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Spaghetti Bolognese', 
  //     'Elke Italiaanse nonna heeft haar eigen bologneserecept.', 
  //     'https://static.ah.nl/static/recepten/img_RAM_PRD121467_890x594_JPG.jpg',
  //     [
  //       new Ingredient('Spaghetti', 1),
  //       new Ingredient('Pastasaus', 1)
  //     ]),
  //   new Recipe(
  //     'Pizza Hawaï', 
  //     'Pizza met ananas? Ja! Deze is voor alle pizza Hawaï lovers.', 
  //     'https://static.ah.nl/static/recepten/img_RAM_PRD134303_890x594_JPG.jpg',
  //     [
  //       new Ingredient('Pizzabodem', 1),
  //       new Ingredient('Ananas', 1),
  //       new Ingredient('Tomatensaus', 1)
  //     ])
  // ];
  private recipes: Recipe[] = [];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next([...this.recipes]);
  }

  getRecipes(): Recipe[] {
    // ES6 way of returning a copy of the recipes.
    return [...this.recipes];
  }

  getRecipe(index: number): Recipe {
    return this.recipes[index];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next([...this.recipes]);
    return this.recipes.length - 1;
  }

  updateRecipe(index: number, updatedRecipe: Recipe) {
    this.recipes[index] = updatedRecipe;
    this.recipesChanged.next([...this.recipes]);
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next([...this.recipes]);
  }
}