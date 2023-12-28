import {
  Component,
  OnDestroy,
  OnInit,
  inject
} from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.less'
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  private shoppingListService?: ShoppingListService;
  private subscription: Subscription;
  ingredients: Ingredient[];

  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }

  ngOnInit() {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subscription = this.shoppingListService.ingredientsChanged
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
