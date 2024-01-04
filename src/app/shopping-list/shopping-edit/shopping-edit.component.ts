import { 
  Component, 
  OnDestroy, 
  OnInit,
  inject 
} from '@angular/core';
import { 
  FormBuilder, 
  FormGroup, 
  Validators 
} from '@angular/forms';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrl: './shopping-edit.component.less'
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  subscription: Subscription
  private shoppingListService?: ShoppingListService;
  shoppingItemForm: FormGroup;
  editedItemIndex: number;
  editMode: boolean = false;
  editedItem: Ingredient;

  constructor(private formBuilder: FormBuilder) {
    this.shoppingListService = inject(ShoppingListService);
  }

  ngOnInit() {
    this.shoppingItemForm = this.formBuilder.group({
      name: [null, Validators.required],
      amount: [null, [Validators.required, Validators.pattern('^[1-9]+[0-9]*$')]]
    });

    this.subscription = this.shoppingListService.startedEditing
      .subscribe(
        (index: number) => {
          this.editedItemIndex = index;
          this.editMode = true;
          this.editedItem = this.shoppingListService.getIngredient(index);
          this.shoppingItemForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          })
        }
      );
  }

  onSubmit() {
    // console.log(this.shoppingItemForm)
    const ingName = this.shoppingItemForm.controls.name.value;
    const ingAmount = this.shoppingItemForm.controls.amount.value;
    const newIngredient = new Ingredient(ingName, ingAmount);

    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.editedItemIndex, newIngredient);
    } else {
      this.shoppingListService.addIngredient(newIngredient);      
    }

    this.editMode = false;
    this.shoppingItemForm.reset();
  }

  onClear() {
    this.editMode = false;
    this.shoppingItemForm.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onClear();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
