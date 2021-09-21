import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private recipeUrl = 'https://ng-course-project-277f1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {}

  storeRecipes() {
    // Request
    const recipes = this.recipeService.getRecipes();
    this.http.put(
      this.recipeUrl,
      recipes
    )
    .subscribe(response => {
      console.log(response);
    });
  }
}