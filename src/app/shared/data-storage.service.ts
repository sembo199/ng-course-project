import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core"
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from 'rxjs/operators';
import { AuthService } from "../auth/auth.service";
import { User } from "../auth/user.model";

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private recipeUrl = 'https://ng-course-project-277f1-default-rtdb.europe-west1.firebasedatabase.app/recipes.json';

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
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

  fetchRecipes() {
    return this.authService.user.pipe(take(1), exhaustMap(user => { 
      return this.http
        .get<Recipe[]>(this.recipeUrl,
        {
          params: new HttpParams().set('auth', user.token)
        });
    }),
    map(recipes => {
      return recipes.map(recipe => {
        return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
      });
    }),
    tap(recipes => {
      this.recipeService.setRecipes(recipes);
    }));
  }
}