import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { Ingredient } from "../shared/ingredient.model";

@Injectable({providedIn: 'root'})
export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();
  startedEditing = new Subject<number>();
  private ingredients: Ingredient[] = [
    new Ingredient('Spaghetti', 1),
    new Ingredient('Pasta saus', 1),
    new Ingredient('Rundergehakt', 1)
  ];

  getIngredients() {
    return [...this.ingredients];
  }

  getIngredient(index: number) {
    return this.ingredients[index];
  }

  // addIngredient(ingredient: Ingredient) {
  //   this.ingredients.push(ingredient);
  //   this.ingredientsChanged.next([...this.ingredients]);
  // }

  // addIngredients(newIngredients: Ingredient[]) {
  //   this.ingredients = [...this.ingredients, ...newIngredients];
  //   this.ingredientsChanged.next([...this.ingredients]);
  // }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next([...this.ingredients]);
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next([...this.ingredients]);
  }

  formCleared() {
    this.ingredientsChanged.next([...this.ingredients]);
  }
}