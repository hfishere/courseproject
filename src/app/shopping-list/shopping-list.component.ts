import { 
  Component, 
  OnInit, 
  inject } from '@angular/core';
  
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.less'
})
export class ShoppingListComponent implements OnInit {
  private shoppingListService?: ShoppingListService;
  ingredients: Ingredient[];

  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) =>
      {
        this.ingredients = ingredients;
      }
    )
  }
}
