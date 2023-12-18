import { Component } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.less'
})
export class ShoppingListComponent {
  ingredients: Ingredient[] = [
    new Ingredient('Oranges', 5),
    new Ingredient('Apples', 7)
  ];

  onNewAddedIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
  }
}
