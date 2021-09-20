import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { ShoppingListService } from 'src/app/shopping-list/shopping-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;

  constructor(
    private slService: ShoppingListService,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data: Data) => {
      this.recipe = this.recipeService.getRecipe(data.id);
      if (!this.recipe) {
        this.router.navigate(['recipes', 'not-found']);
      }
    })
  }
  
  addToShoppingList() {
    this.slService.addIngredients(this.recipe.ingredients);
  }

}
