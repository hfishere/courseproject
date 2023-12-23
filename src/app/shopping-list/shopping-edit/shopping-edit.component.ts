import { 
  Component, 
  ElementRef,
  ViewChild, 
  inject } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.less'
})
export class ShoppingEditComponent {
  private shoppingListService?: ShoppingListService;
  @ViewChild('nameInput') nameInputRef: ElementRef;
  @ViewChild('amountInput') amountInputRef: ElementRef;

  constructor() {
    this.shoppingListService = inject(ShoppingListService);
  }

  onIngredientAdded() {
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    this.shoppingListService.addIngredient(newIngredient);
  }
}
