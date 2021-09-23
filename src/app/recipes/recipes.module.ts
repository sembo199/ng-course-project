import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { SharedModule } from "../shared/shared.module";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeItemComponent } from "./recipe-list/recipe-item/recipe-item.component";
import { RecipeListComponent } from "./recipe-list/recipe-list.component";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesRoutingModule } from "./recipes-routing.module";
import { RecipesComponent } from "./recipes.component";

// Removed export recipe components as we are no longer using them in app module.
@NgModule({
  declarations: [
    RecipesComponent,
    RecipeEditComponent,
    RecipeDetailComponent,
    RecipeListComponent,
    RecipeItemComponent,
    RecipeStartComponent
  ],
  imports: [
    RecipesRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ]
})
export class RecipesModule {}