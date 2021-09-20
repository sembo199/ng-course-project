import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  private ingredients: Ingredient[] = [
    new Ingredient('Spaghetti', 1),
    new Ingredient('Pasta saus', 1),
    new Ingredient('Rundergehakt', 1)
  ];

  getIngredients() {
    return [...this.ingredients];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next([...this.ingredients]);
  }

  addIngredients(newIngredients: Ingredient[]) {
    this.ingredients = [...this.ingredients, ...newIngredients];
    this.ingredientsChanged.next([...this.ingredients]);
  }
}