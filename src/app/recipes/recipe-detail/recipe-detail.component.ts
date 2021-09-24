import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private store: Store<fromApp.AppState>,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Fetching the ID from the route params
    this.route.params.subscribe((params: Params) => {
      this.id = +params.id;
      this.recipe = this.recipeService.getRecipe(this.id);
      if (!this.recipe) {
        this.router.navigate(['/recipes']);
      }
    })
  }
  
  addToShoppingList() {
    // this.slService.addIngredients(this.recipe.ingredients);
    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDeleteRecipe() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], {relativeTo: this.route});
  }

}
