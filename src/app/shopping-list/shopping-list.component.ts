import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoggingService } from '../logging.service';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Observable<{ingredients: Ingredient[]}>;
  selectedIngredient: number;

  constructor(
    private loggingService: LoggingService,
    private store: Store<fromApp.AppState>
  ) { }

  ngOnInit(): void {
    this.ingredients = this.store.select('shoppingList').pipe(
      tap(data => {
        this.selectedIngredient = data['editedIngredientIndex'];
      })
    );
    // this.store.select('shoppingList').subscribe();
    this.loggingService.printLog("Hello from Shopping List Component");
  }

  onEditItem(index: number) {
    this.selectedIngredient = index;
    // this.slService.startedEditing.next(index);
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
  }

  ngOnDestroy() {

  }

}
