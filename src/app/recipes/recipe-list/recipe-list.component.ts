import { Component, OnInit } from '@angular/core';

import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [
    new Recipe(
      'Spaghetti Bolognese', 
      'Elke Italiaanse nonna heeft haar eigen bologneserecept.', 
      'https://static.ah.nl/static/recepten/img_RAM_PRD121467_890x594_JPG.jpg'),
    new Recipe(
      'Pizza Hawaï', 
      'Pizza met ananas? Ja! Deze is voor alle pizza Hawaï lovers.', 
      'https://static.ah.nl/static/recepten/img_RAM_PRD134303_890x594_JPG.jpg')
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
