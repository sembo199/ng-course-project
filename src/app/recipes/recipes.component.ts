import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent implements OnInit, OnDestroy {
  recipesSubscription: Subscription;

  constructor(
    private dataStorageService: DataStorageService,
  ) { }

  ngOnInit(): void {
    this.recipesSubscription = this.dataStorageService.fetchRecipes().subscribe();
  }

  ngOnDestroy() {
    this.recipesSubscription.unsubscribe();
  }

}
