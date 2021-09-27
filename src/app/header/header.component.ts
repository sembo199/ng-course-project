import { Component, OnDestroy, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { map } from "rxjs/operators";
import { User } from "../auth/user.model";
import * as fromApp from '../store/app.reducer';
import * as AuthActions from '../auth/store/auth.actions';
import * as RecipeActions from '../recipes/store/recipe.actions';
import { HeaderService } from "./header.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers: [HeaderService]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userSub = new Subscription();
  isAuthenticated = false;
  collapsed = true;
  title: string;

  constructor(
    private store: Store<fromApp.AppState>,
    private headerService: HeaderService
  ) {}

  ngOnInit() {
    this.title = this.headerService.title;
    this.userSub = this.store.select('auth').pipe(
      map(authState => authState.user)
    ).subscribe((user: User) => {
      this.isAuthenticated = !!user;
    });
  }

  onSaveData() {
    this.store.dispatch(new RecipeActions.StoreRecipes());
  }

  onFetchData() {
    this.store.dispatch(new RecipeActions.FetchRecipes());
  }

  onLogOut() {
    this.store.dispatch(new AuthActions.SignOut());
  }

  ngOnDestroy() {
    this.userSub.unsubscribe();
  }
}