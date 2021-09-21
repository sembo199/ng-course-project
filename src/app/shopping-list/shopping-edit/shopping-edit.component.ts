import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  name: string;
  amount: number;

  constructor(private slService: ShoppingListService) { }

  ngOnInit(): void {}

  onSubmit(form: NgForm) {
    console.log(form);
    if (form.valid) {
      const ingredient: Ingredient = new Ingredient(
        form.value.name,
        form.value.amount
      );
      this.slService.addIngredient(ingredient);
    } else {
      alert('Please check the fields.')
    }
  }

}
