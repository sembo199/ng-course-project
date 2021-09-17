import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";

@Injectable({providedIn: 'root'})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();
  private recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Bolognese', 
      'Elke Italiaanse nonna heeft haar eigen bologneserecept.', 
      'https://static.ah.nl/static/recepten/img_RAM_PRD121467_890x594_JPG.jpg'),
    new Recipe(
      'Pizza Hawaï', 
      'Pizza met ananas? Ja! Deze is voor alle pizza Hawaï lovers.', 
      'https://static.ah.nl/static/recepten/img_RAM_PRD134303_890x594_JPG.jpg')
  ];

  getRecipes(): Recipe[] {
    // ES6 way of returning a copy of the recipes.
    return [...this.recipes];
  }
}